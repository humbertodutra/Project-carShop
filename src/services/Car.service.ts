import { isValidObjectId } from 'mongoose';
import { IService } from '../interfaces/Service.interface';
import { ICar, carZodSchema } from '../interfaces/Car.interface';
import { IModel } from '../interfaces/Model.interface';
import { ErrorTypes } from '../errors/catelog';

class CarService implements IService<ICar> {
  private _carModel:IModel<ICar>;

  constructor(model:IModel<ICar>) {
    this._carModel = model;
  }

  public async create(obj: unknown): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    return this._carModel.create(parsed.data as ICar);
  }

  public async readOne(id: string): Promise<ICar> {
    if (!isValidObjectId(id)) throw new Error(ErrorTypes.InvalidId);
    const car = await this._carModel.readOne(id);
    if (!car) throw new Error(ErrorTypes.NotFound);
    return car as ICar;
  }

  public async read(): Promise<ICar[]> {
    return this._carModel.read();
  }

  public async delete(id: string): Promise<ICar> {
    if (!isValidObjectId(id)) throw new Error(ErrorTypes.InvalidId);
    const car = await this._carModel.delete(id);
    if (!car) throw new Error(ErrorTypes.NotFound);
    return car;
  }

  public async update(id: string, obj: unknown): Promise<ICar> {
    if (!isValidObjectId(id)) throw new Error(ErrorTypes.InvalidId);
    if (!obj || JSON.stringify(obj) === '{}') throw new Error(ErrorTypes.EmptyBody);

    const car = await this._carModel.update(id, obj as ICar);
    if (!car) throw new Error(ErrorTypes.NotFound);
    return car as ICar;
  }
}

export default CarService;