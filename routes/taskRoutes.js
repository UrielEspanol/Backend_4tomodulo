const express = require("express");
const Task = require("../models/Task");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// 📌 Validaciones para la creación y actualización de tareas
const validateTask = [
    body("title")
        .trim()
        .notEmpty().withMessage("El título es obligatorio")
        .isLength({ min: 3 }).withMessage("El título debe tener al menos 3 caracteres"),
    body("description")
        .trim()
        .notEmpty().withMessage("La descripción es obligatoria"),
    body("dueDate")
        .optional()
        .isISO8601().withMessage("La fecha debe ser válida (YYYY-MM-DD)"),
    body("priority")
        .isIn(["baja", "media", "alta"]).withMessage("La prioridad debe ser 'baja', 'media' o 'alta'"),
    body("status")
        .isIn(["pendiente", "en progreso", "completada"]).withMessage("El estado debe ser 'pendiente', 'en progreso' o 'completada'")
];

// 📌 Obtener todas las tareas
router.get("/", async (req, res) => {
    console.log("📌 Recibiendo solicitud GET /api/tasks");
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        console.error("❌ Error al obtener tareas:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});

// 📌 Crear una nueva tarea con validaciones
router.post("/", validateTask, async (req, res) => {
    console.log("📌 Recibiendo solicitud POST /api/tasks", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        console.error("❌ Error al crear tarea:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});

// 📌 Actualizar una tarea por ID con validaciones
router.put("/:id", validateTask, async (req, res) => {
    console.log(`📌 Recibiendo solicitud PUT /api/tasks/${req.params.id}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }
        await task.update(req.body);
        res.json(task);
    } catch (error) {
        console.error("❌ Error al actualizar tarea:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});

// 📌 Eliminar una tarea por ID
router.delete("/:id", async (req, res) => {
    console.log(`📌 Recibiendo solicitud DELETE /api/tasks/${req.params.id}`);
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }
        await task.destroy();
        res.json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
        console.error("❌ Error al eliminar tarea:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});

module.exports = router;
