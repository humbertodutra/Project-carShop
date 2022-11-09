import { z } from 'zod';
import { IVehicle } from './Vehicle.interface';

export const motorcycleZodSchema = z.object({
  _id: z.string().optional(),
  model: z.string().min(3),
  year: z.number().int().gte(1900).lte(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().gte(1).lte(2500),
  doorsQty: z.number().optional(),
  seatsQty: z.number().optional(),
});

type MotorcycleType = z.infer<typeof motorcycleZodSchema>;

export interface IMotorcycle extends IVehicle, MotorcycleType {}
