const request = require("supertest");
const app = require("../index");

describe("Plantiv Endpoints", () => {
  it("debería listar todos los productos", async () => {
    const res = await request(app).get("/store/products");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("length");
  });
  it("debería obtener un producto por ID", async () => {
    const res = await request(app).get("/store/products/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", 1);
  });
  it("fallo al obtener un producto con un ID inválido", async () => {
    const res = await request(app).get("/store/products/9999");

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error", "Producto no encontrado");
  });
});
