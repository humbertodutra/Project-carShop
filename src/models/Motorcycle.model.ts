import { model as mongooseModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/Motorcycle.interface';
import MongoModel from './Mongo.model';

const motorcycleMongooseSchema = new Schema<IMotorcycle>(
  {
    model: String,
    year: Number,
    color: String,
    status: Boolean,
    buyValue: Number,
    category: String,
    engineCapacity: Number,
  },
  { versionKey: false },
);

class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor(model = mongooseModel('Motorcycle', motorcycleMongooseSchema)) {
    super(model);
  }
}

export default MotorcycleModel;