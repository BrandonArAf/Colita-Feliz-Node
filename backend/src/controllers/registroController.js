import { registroService } from '../services/registroService.js';
export const registroController = {
  list: async (_req, res) => res.json(await registroService.list()),
  create: async (req, res) => {
    try {
      const created = await registroService.create(req.body);
      res.status(201).json(created);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  delete: async (req, res) => {
    try {
      const deleted = await registroService.delete(req.params.id);
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
};
