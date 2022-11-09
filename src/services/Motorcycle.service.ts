import { isValidObjectId } from 'mongoose';
import { IService } from '../interfaces/Service.interface';
import { IModel } from '../interfaces/Model.interface';
import { IMotorcycle, motorcycleZodSchema } from '../interfaces/Motorcycle.interface';
import { ErrorTypes } from '../errors/catelog';

class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycleModel:IModel<IMotorcycle>;

  constructor(model:IModel<IMotorcycle>) {
    this._motorcycleModel = model;
  }

  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsed = motorcycleZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    return this._motorcycleModel.create(parsed.data as IMotorcycle);
  }

  public async readOne(id: string): Promise<IMotorcycle> {
    if (!isValidObjectId(id)) throw new Error(ErrorTypes.InvalidId);
    const car = await this._motorcycleModel.readOne(id);
    if (!car) throw new Error(ErrorTypes.NotFound);
    return car as IMotorcycle;
  }

  public async read(): Promise<IMotorcycle[]> {
    return this._motorcycleModel.read();
  }

  public async delete(id: string): Promise<IMotorcycle> {
    if (!isValidObjectId(id)) throw new Error(ErrorTypes.InvalidId);
    const car = await this._motorcycleModel.delete(id);
    if (!car) throw new Error(ErrorTypes.NotFound);
    return car;
  }

  public async update(id: string, obj: unknown): Promise<IMotorcycle> {
    if (!isValidObjectId(id)) throw new Error(ErrorTypes.InvalidId);
    if (!obj || JSON.stringify(obj) === '{}') throw new Error(ErrorTypes.EmptyBody);

    const car = await this._motorcycleModel.update(id, obj as IMotorcycle);
    if (!car) throw new Error(ErrorTypes.NotFound);
    return car as IMotorcycle;
  }
}

export default MotorcycleService;