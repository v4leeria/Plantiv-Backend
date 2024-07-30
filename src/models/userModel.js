const { pool } = require("../config/db");

const getUserByEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  } catch (err) {
    throw new Error("Error al obtener el usuario por correo electrónico");
  }
};

const createUser = async (user) => {
  try {
    const { name, lastName, email, password, comuna, region, phone_number } =
      user;
    const result = await pool.query(
      "INSERT INTO users (name, lastName, email, password, comuna, region, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, lastName, email, password, comuna, region, phone_number]
    );
    console.log("User created:", result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error("Error al crear el usuario:", err);
    throw new Error("Error al crear el usuario");
  }
};

module.exports = { getUserByEmail, createUser };
