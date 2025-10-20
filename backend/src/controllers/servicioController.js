import { servicioService } from '../services/servicioService.js';
export const servicioController = {
  list: async (_req, res) => res.json(await servicioService.list())
};
