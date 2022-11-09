import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './Mongo.model';

const carMongooseSchema = new Schema<ICar>({
  doorsQty: Number,
  seatsQty: Number,
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
}, { versionKey: false });

class CarModel extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Cars', carMongooseSchema)) {
    super(model);
  }
}

export default CarModel;