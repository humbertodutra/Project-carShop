import { Model, UpdateQuery } from 'mongoose';
import { IModel } from '../interfaces/Model.interface';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(obj:T):Promise<T> {
    return this._model.create({ ...obj });
  }

  public async readOne(_id: string): Promise<T | null> {
    return this._model.findOne({ _id });
  }

  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async delete(_id: string): Promise<T | null> {
    return this._model.findByIdAndDelete({ _id });
  }

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    return this._model.findByIdAndUpdate({ _id }, { ...obj } as UpdateQuery<T>);
  }
}

export default MongoModel;