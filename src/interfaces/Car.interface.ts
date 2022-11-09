import { z } from 'zod';
import { IVehicle } from './Vehicle.interface';

export const carZodSchema = z.object({
  _id: z.string().optional(),
  model: z.string().min(3),
  year: z.number().int().gte(1900).lte(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
  doorsQty: z.number().int().gte(2).lte(4)
    .optional(),
  seatsQty: z.number().gte(2).lte(7).optional(),
});

type CarType = z.infer<typeof carZodSchema>;

export interface ICar extends IVehicle, CarType {}
