import express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/errorMiddleware';
import carRouter from './routes/car.routes';
import motorcycleRouter from './routes/motorcyle.routes';

const app = express();
app.use(express.json());
app.use(carRouter);
app.use(motorcycleRouter);
app.use(errorMiddleware);

export default app;
