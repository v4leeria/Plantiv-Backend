const { getUserByEmail, createUser } = require("../models/userModel");
const { generateToken } = require("../config/jwt");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user);
      res.json({ token });
    } else {
      res.status(401).json({ error: "Email o contraseña inválida" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error de login" });
  }
};

const register = async (req, res) => {
  const { name, lastName, email, password, comuna, region, phone_number } =
    req.body;
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Usuario ya existe" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({
      name,
      lastName,
      email,
      password: hashedPassword,
      comuna,
      region,
      phone_number,
    });
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (err) {
    console.error("Error al registrar el usuario:", err.message);
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

module.exports = { login, register };
