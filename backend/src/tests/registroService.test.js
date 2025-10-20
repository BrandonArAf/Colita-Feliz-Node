import { registroService } from '../services/registroService.js';

jest.unstable_mockModule('../repositories/servicioRepository.js', () => ({
  servicioRepository: {
    findById: jest.fn(async (id) => id ? { id } : null),
  }
}));
jest.unstable_mockModule('../repositories/registroRepository.js', () => ({
  registroRepository: {
    create: jest.fn(async (dto) => ({ id: 1, ...dto })),
    findAll: jest.fn(async () => []),
  }
}));

describe('registroService', () => {
  test('valida campos obligatorios', async () => {
    await expect(registroService.create({})).rejects.toThrow();
    const ok = await registroService.create({ dueno:'A', mascota:'B', servicio_id:'cuidado', ingreso:'2025-10-01', salida:'2025-10-02' });
    expect(ok.id).toBe(1);
  });
});
