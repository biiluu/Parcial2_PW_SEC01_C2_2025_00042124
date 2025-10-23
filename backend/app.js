import express from 'express';
import cors from 'cors';
import cuentasRoutes from './routes/cuentas.routes.js';

const app = express();

const PORT = 3130;

app.use(cors());
app.use(express.json());

app.use('/', cuentasRoutes);
app.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en http://localhost:${PORT}`);
});
