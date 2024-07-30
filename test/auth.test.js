const request = require("supertest");
const app = require("../index"); // Asegúrate de que `app` está exportado en tu archivo `index.js`

describe("Endpoints Autenticación", () => {
  it("debería registrar un nuevo usuario", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "Guillermina",
      lastName: "Mendez",
      email: "guille@example.com",
      password: "123456",
      comuna: "Parral",
      region: "Maule",
      phone_number: "456123789",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("debería iniciar sesión un usuario", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "guille@example.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
