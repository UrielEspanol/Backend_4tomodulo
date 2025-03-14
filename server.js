// Importaciones
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Habilitar CORS y JSON
app.use(cors());
app.use(express.json());

// Middleware de depuración para ver solicitudes entrantes
app.use((req, res, next) => {
  console.log(`📩 [${req.method}] ${req.url} - Body:`, req.body);
  next();
});

// Configurar conexión a MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
});

// Intentar conexión a MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a la base de datos:", err);
    return;
  }
  console.log("✅ Conectado a la base de datos MySQL");
});

// ✅ Agregar mensaje para confirmar que `authRoutes` se carga
console.log("✅ Cargando rutas de autenticación...");
app.use("/api/auth", authRoutes);

console.log("✅ Cargando rutas de tareas...");
app.use("/api/tasks", taskRoutes);

// Sincronizar Sequelize y arrancar servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Bienvenido a TaskMaster Backend!");
});
