import axios from "axios";

const API_URL = "http://localhost:5000"; // Ajusta el puerto si tu backend usa otro

// 1. Iniciar sesión
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error en login:", error.response?.data || error.message);
  }
};

// 2. Obtener todas las tareas
export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener tareas:", error.response?.data || error.message);
  }
};

// 3. Crear una nueva tarea
export const createTask = async (title, description) => {
  try {
    const response = await axios.post(`${API_URL}/`, { title, description });
    return response.data;
  } catch (error) {
    console.error("Error al crear tarea:", error.response?.data || error.message);
  }
};

// 4. Editar una tarea
export const updateTask = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar tarea:", error.response?.data || error.message);
  }
};

// 5. Eliminar una tarea
export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    console.log("Tarea eliminada");
  } catch (error) {
    console.error("Error al eliminar tarea:", error.response?.data || error.message);
  }
};
