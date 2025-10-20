import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import servicioRoutes from './routes/servicioRoutes.js';
import registroRoutes from './routes/registroRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.json({ ok: true, name: 'colita-feliz-backend' }));
app.use('/api/servicios', servicioRoutes);
app.use('/api/registros', registroRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`[backend] http://localhost:${PORT}`));
