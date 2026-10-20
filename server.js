import express from 'express';
import pedidosRouter from './routes/pedidos.js'; // Importamos la ruta

const app = express();
const PORT = 3000;

app.use(express.json());

// Registramos el router con el prefijo /api/pedidos
app.use('/api/pedidos', pedidosRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});