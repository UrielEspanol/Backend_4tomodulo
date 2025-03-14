const Task = require('../models/Task');

// Obtener todas las tareas del usuario autenticado
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id } });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tareas', error });
    }
};

// Crear una nueva tarea
exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, status } = req.body;
        const task = await Task.create({ 
            title, 
            description, 
            dueDate, 
            priority, 
            status, 
            userId: req.user.id 
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear tarea', error });
    }
};

// Actualizar una tarea
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if (!task || task.userId !== req.user.id) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        await task.update(req.body);
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar tarea', error });
    }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if (!task || task.userId !== req.user.id) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        await task.destroy();
        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar tarea', error });
    }
};
