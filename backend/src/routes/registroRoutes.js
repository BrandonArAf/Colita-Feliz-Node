import { Router } from 'express';
import { registroController } from '../controllers/registroController.js';
const router = Router();
router.get('/', registroController.list);
router.post('/', registroController.create);
router.delete('/:id', registroController.delete);
export default router;
