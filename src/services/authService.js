export async function loginUser(credentials) {
  const urls = [
    { url: "http://localhost:8080/api/admins/login", rolEsperado: "ADMIN" },
    { url: "http://localhost:8080/api/usuarios/login", rolEsperado: "USER" },
  ];

  for (const { url, rolEsperado } of urls) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.rol === rolEsperado) return data;
    }
  }

  throw new Error("Credenciales incorrectas");
}
