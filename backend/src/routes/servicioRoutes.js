import { Router } from 'express';
import { servicioController } from '../controllers/servicioController.js';
const router = Router();
router.get('/', servicioController.list);
export default router;
