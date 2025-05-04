// // src/mocks/authMocks.js
// let mockDatabase = []; // Simula una base de datos en memoria

// // Simula la lógica de registro
// export const registerUserMock = async (user) => {
//   const emailExists = mockDatabase.some((u) => u.email === user.email);

//   if (emailExists) {
//     throw new Error("El correo electrónico ya está registrado.");
//   }

//   // Simula la creación del usuario
//   mockDatabase.push({
//     _id: user.email,
//     ...user,
//     fechaCreacion: new Date(),
//     fotoPerfil: "https://example.com/default_profile_picture.jpg", // Foto predeterminada
//   });

//   return { success: true, message: "Usuario registrado correctamente." };
// };

// // Simula la lógica de login
// export const loginUserMock = async (email, password) => {
//   const user = mockDatabase.find(
//     (u) => u.email === email && u.password === password
//   );

//   if (!user) {
//     throw new Error("Credenciales incorrectas.");
//   }

//   return { success: true, message: "Login exitoso", user };
// };
