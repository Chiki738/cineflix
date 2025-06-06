from pymongo import MongoClient
import pandas as pd
from datetime import datetime, timedelta
import calendar
import plotly.express as px
import plotly.graph_objects as go
import dash
from dash import html, dcc, Input, Output
import threading

# Puerto para la aplicacion Dash - cambienlo por si quieren usar otro puerto
PUERTO_DASH = 8055

MONGO_URI = "mongodb+srv://Hugo:analisis12345@cineflix-db.5mvzahh.mongodb.net/?retryWrites=true&w=majority"
DB_NAME = "cineflix"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# Variables globales para almacenar dataframes y graficas
global df_users, df_search, df_vistas, df_sesiones
global fig_planes, fig_genres, card_new, card_views, card_visits, card_active, fig_active_line

# Funcion que carga y procesa los datos de MongoDB
def cargar_datos():
    global df_users, df_search, df_vistas, df_sesiones
    global fig_planes, fig_genres, card_new, card_views, card_visits, card_active, fig_active_line

    df_users = pd.DataFrame(list(db['usuarios_new'].find()))
    df_users['fecha_inicio_plan'] = pd.to_datetime(df_users['fecha_inicio_plan'])
    df_users['fecha_fin_plan'] = pd.to_datetime(df_users['fecha_fin_plan'])
    df_users['fechaCreacionCuenta'] = pd.to_datetime(df_users['fechaCreacionCuenta'])

    df_search = pd.DataFrame(list(db['busquedas'].find()))
    df_search['category'] = df_search['category'].astype(str)

    df_vistas = pd.DataFrame(list(db['vistas'].find()))
    df_vistas['timestamp'] = pd.to_datetime(df_vistas['timestamp'])

    df_sesiones = pd.DataFrame(list(db['sesiones'].find()))
    df_sesiones['inicioSesion'] = pd.to_datetime(df_sesiones['inicioSesion'])
    df_sesiones['finSesion'] = pd.to_datetime(df_sesiones['finSesion'], errors='coerce')

    hoy = datetime.now().replace(day=1)
    mes_ant_end = hoy - timedelta(days=1)
    mes_ant_start = mes_ant_end.replace(day=1)
    mes_act_start = hoy
    mes_act_end = (hoy + pd.offsets.MonthEnd(0))

    etq_ant = f"{calendar.month_abbr[mes_ant_start.month]} {mes_ant_start.year}"
    etq_act = f"{calendar.month_abbr[mes_act_start.month]} {mes_act_start.year}"

    # Funcion que verifica si un plan esta activo en un rango
    def plan_activo_en_rango(r, start, end):
        return (r['fecha_inicio_plan'] <= end) and (r['fecha_fin_plan'] >= start)

    # Recoleccion de registros de planes activos en los meses comparados
    regs = []
    for _, r in df_users.iterrows():
        if plan_activo_en_rango(r, mes_ant_start, mes_ant_end):
            regs.append({'plan': r['plan_seleccionado'], 'mes': etq_ant})
        if plan_activo_en_rango(r, mes_act_start, mes_act_end):
            regs.append({'plan': r['plan_seleccionado'], 'mes': etq_act})

    # Grafico de comparacion de planes activos
    df_reg = pd.DataFrame(regs)
    plot_planes = df_reg.groupby(['mes', 'plan']).size().reset_index(name='count')

    fig_planes = px.bar(
        plot_planes,
        x='plan', y='count', color='mes', barmode='group',
        title=f"Planes Activos: {etq_ant} vs {etq_act}",
        labels={'plan': 'Plan', 'count': 'Usuarios'}
    )
    fig_planes.update_layout(
        autosize=True,
        margin=dict(t=70, b=50), height=600,
        title_font=dict(size=24, family='Arial', color='#333'),
        font=dict(family='Verdana', size=12, color='#555')
    )

    # Grafico circular para categorias mas buscadas
    genre_counts = df_search.groupby('category').size().reset_index(name='count')
    fig_genres = px.pie(
        genre_counts,
        names='category', values='count',
        title='Categorías Más Buscadas'
    )
    fig_genres.update_traces(
        textinfo='percent+label', textposition='inside',
        marker=dict(line=dict(color='#ffffff', width=3)),
        pull=[0.05 if v == max(genre_counts['count']) else 0 for v in genre_counts['count']]
    )
    fig_genres.update_layout(
        autosize=True,
        margin=dict(t=70, b=50), height=600,
        title_font=dict(size=24, family='Arial', color='#333'),
        font=dict(family='Verdana', size=12, color='#555'),
        legend_title_text='Categoría',
        legend=dict(orientation='h', y=-0.1)
    )

    year_curr = hoy.year
    year_prev = year_curr - 1

    # Calculo de metricas (usuarios nuevos, vistas, visitas, activos)
    count_month = lambda df, col, start, end: df[(df[col] >= start) & (df[col] <= end)].shape[0]

    altas_now = count_month(df_users, 'fechaCreacionCuenta', mes_act_start, mes_act_end)
    altas_prev = count_month(df_users, 'fechaCreacionCuenta', mes_ant_start, mes_ant_end)
    vistas_now = count_month(df_vistas, 'timestamp', mes_act_start, mes_act_end)
    vistas_prev = count_month(df_vistas, 'timestamp', mes_ant_start, mes_ant_end)
    visits_now = count_month(df_sesiones, 'inicioSesion', mes_act_start, mes_act_end)
    visits_prev = count_month(df_sesiones, 'inicioSesion', mes_ant_start, mes_ant_end)

    # USUARIOS ACTIVOS finSesion: null
    active_user_ids_now = df_sesiones[pd.isna(df_sesiones['finSesion'])]['userId'].unique()
    act_now = len(active_user_ids_now)

    # act_prev para la tarjeta se mantiene basado en plan activo
    act_prev = df_users.apply(lambda r: plan_activo_en_rango(r, mes_ant_start, mes_ant_end), axis=1).sum()

    # Funcion para crear tarjetas para mostrar metricas en el dash
    def make_card(title, actual, prev, show_delta=True): 
        fig = go.Figure(go.Indicator(
            mode="number+delta" if show_delta and prev > 0 else "number", 
            value=actual,
            title={'text': f'<b>{title}</b>', 'font': {'size': 18}},
            delta=dict(reference=prev, relative=True, valueformat='.0%') if show_delta and prev > 0 else None, 
            number={'font': {'size': 48}}
        ))
        fig.update_layout(
            autosize=True,
            margin=dict(t=40, b=20, l=20, r=20),
            height=240,
            paper_bgcolor='#ffffff',
            plot_bgcolor='#ffffff'
        )
        return fig

    # Tarjetas de metricas
    card_new = make_card('Nuevos Usuarios', altas_now, altas_prev)
    card_views = make_card('Vistas', vistas_now, vistas_prev)
    card_visits = make_card('Visitas', visits_now, visits_prev)
    card_active = make_card('Usuarios Activos', act_now, act_prev, show_delta=False) 

    # GRÁFICO DE LÍNEA 'USUARIOS ACTIVOS MENSUALES' (EN BASE A PLANES ACTIVOS)
    active_monthly = []
    for yr in [year_prev, year_curr]:
        for m in range(1, 13):
            start = datetime(yr, m, 1)
            end = datetime(yr, m, calendar.monthrange(yr, m)[1], 23, 59, 59)
            # Contar usuarios activos según el plan activo en el rango
            cnt = df_users.apply(lambda r: plan_activo_en_rango(r, start, end), axis=1).sum()
            active_monthly.append({'year': yr, 'month': m, 'count': cnt})
    active_df = pd.DataFrame(active_monthly)

    fig_active_line = px.line(
        active_df, x='month', y='count', color='year', markers=True,
        labels={'count': 'Usuarios Activos', 'month': 'Mes', 'year': 'Año'},
        title='Usuarios Activos Mensuales - Comparativa Anual'
    )
    fig_active_line.update_layout(
        autosize=True,
        xaxis=dict(tickmode='array', tickvals=list(range(1, 13)), ticktext=[calendar.month_abbr[m] for m in range(1, 13)]),
        margin=dict(t=70, b=50),
        title_font=dict(size=24, family='Arial', color='#333'),
        font=dict(family='Verdana', size=12, color='#555')
    )

# Carga inicial de los datos
cargar_datos()

# Funcion para escuchar cambios con change_streams
def escuchar_cambios():
    pipeline = [{'$match': {'operationType': {'$in': ['insert', 'update', 'replace', 'delete']}}}]
    try:
        with client[DB_NAME].watch(pipeline) as stream:
            for change in stream:
                print("Cambio detectado en MongoDB:", change)
                cargar_datos()
    except Exception as e:
        print("Error en change stream:", e)

# Lanzar hilo para change stream
hilo_cambios = threading.Thread(target=escuchar_cambios, daemon=True)
hilo_cambios.start()

# Configuracion de la aplicacion Dash
app = dash.Dash(__name__)

app.layout = html.Div([
    html.H1('Dashboard Cineflix', style={
        'textAlign': 'center', 'marginBottom': '40px',
        'fontFamily': 'Arial', 'fontSize': '36px', 'fontWeight': 'bold', 'color': '#2c3e50'
    }),
    dcc.Tabs(id='tabs', value='tab-planes', children=[
        dcc.Tab(label='Planes', value='tab-planes', style={'fontWeight': 'bold', 'fontFamily': 'Verdana'}),
        dcc.Tab(label='Géneros', value='tab-genres', style={'fontWeight': 'bold', 'fontFamily': 'Verdana'}),
        dcc.Tab(label='Usuarios', value='tab-users', style={'fontWeight': 'bold', 'fontFamily': 'Verdana'}),
    ], style={'marginBottom': '20px', 'fontFamily': 'Verdana'}),
    html.Div(id='tabs-content'),
    dcc.Interval(id='interval-component', interval=3*1000, n_intervals=0)   
], style={'padding': '20px', 'backgroundColor': '#ecf0f1', 'fontFamily': 'Verdana', 'maxWidth': '1200px', 'margin': 'auto'})

# Callback que actualiza el contenido
@app.callback(
    Output('tabs-content', 'children'),
    Input('tabs', 'value'),
    Input('interval-component', 'n_intervals')
)
# Actualiza el contenido de la pestaña seleccionada
def render_tab(tab, n):
    if tab == 'tab-planes':
        return html.Div(dcc.Graph(figure=fig_planes, config={'responsive': True}), style={'width': '100%'})
    elif tab == 'tab-genres':
        return html.Div(dcc.Graph(figure=fig_genres, config={'responsive': True}), style={'width': '100%'})
    elif tab == 'tab-users':
        return html.Div([
            html.Div([
                html.Div(dcc.Graph(figure=card_new, config={'responsive': True}), style={
                    'borderRadius': '8px', 'boxShadow': '0 2px 4px rgba(0,0,0,0.1)', 'padding': '10px',
                    'backgroundColor': '#fff', 'width': '100%'
                }),
                html.Div(dcc.Graph(figure=card_views, config={'responsive': True}), style={
                    'borderRadius': '8px', 'boxShadow': '0 2px 4px rgba(0,0,0,0.1)', 'padding': '10px',
                    'backgroundColor': '#fff', 'width': '100%'
                }),
                html.Div(dcc.Graph(figure=card_visits, config={'responsive': True}), style={
                    'borderRadius': '8px', 'boxShadow': '0 2px 4px rgba(0,0,0,0.1)', 'padding': '10px',
                    'backgroundColor': '#fff', 'width': '100%'
                }),
                html.Div(dcc.Graph(figure=card_active, config={'responsive': True}), style={
                    'borderRadius': '8px', 'boxShadow': '0 2px 4px rgba(0,0,0,0.1)', 'padding': '10px',
                    'backgroundColor': '#fff', 'width': '100%'
                }),
            ], style={'display': 'grid', 'gridTemplateColumns': 'repeat(auto-fit, minmax(280px, 1fr))', 'gap': '20px'}),
            html.Div(dcc.Graph(figure=fig_active_line, config={'responsive': True}), style={'marginTop': '40px'})
        ], style={'width': '100%'})
    return html.Div()

# Ejecuta la app
if __name__ == '__main__':
    app.run(debug=True, port=PUERTO_DASH)