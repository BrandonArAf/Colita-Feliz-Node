import { registroRepository } from '../repositories/registroRepository.js';
import { servicioRepository } from '../repositories/servicioRepository.js';

export const registroService = {
  list: () => registroRepository.findAll(),
  create: async (dto) => {
    if(!dto.dueno || !dto.mascota || !dto.servicio_id || !dto.ingreso || !dto.salida){
      throw new Error('Faltan campos obligatorios');
    }
    const svc = await servicioRepository.findById(dto.servicio_id);
    if(!svc) throw new Error('Servicio inválido');
    return registroRepository.create(dto);
  },
  delete: async (id) => {
    const registro = await registroRepository.findById(id);
    if(!registro) throw new Error('Registro no encontrado');
    return registroRepository.delete(id);
  }
};
