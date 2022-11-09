import { Router } from 'express';
import MotorcycleModel from '../models/Motorcycle.model';
import MotorcycleService from '../services/Motorcycle.service';
import MotorcycleController from '../controllers/Motorcycle.controller';

const route = Router();

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

const idUrl = '/motorcycles/:id';

route.get(idUrl, (req, res) => motorcycleController.readOne(req, res));
route.get('/motorcycles', (req, res) => motorcycleController.read(req, res));
route.put(idUrl, (req, res) => motorcycleController.update(req, res));
route.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
route.delete(idUrl, (req, res) => motorcycleController.delete(req, res));

export default route;