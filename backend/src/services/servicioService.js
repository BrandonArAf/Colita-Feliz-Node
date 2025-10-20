import { servicioRepository } from '../repositories/servicioRepository.js';
export const servicioService = {
  list: () => servicioRepository.findAll(),
  get: (id) => servicioRepository.findById(id),
  seed: (items) => servicioRepository.upsertMany(items),
};
