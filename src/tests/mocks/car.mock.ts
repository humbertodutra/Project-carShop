import { ICar } from '../../interfaces/ICar';

const carMock:ICar = {
  doorsQty: 2,
  seatsQty: 2,
  model: 'Ferrari',
  year: 2020,
  color: 'Vermelha',
  status: true,
  buyValue: 1500000,
}

const carMockWithId:ICar & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  doorsQty: 2,
  seatsQty: 2,
  model: 'Ferrari',
  year: 2020,
  color: 'Vermelha',
  status: true,
  buyValue: 1500000,
}

const carChangeMock:ICar = {
  doorsQty: 4,
  seatsQty: 4,
  model: 'Ferrari',
  year: 2020,
  color: 'Azul',
  status: true,
  buyValue: 1800000,
}

const carChangeMockWithId:ICar & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  doorsQty: 4,
  seatsQty: 4,
  model: 'Ferrari',
  year: 2020,
  color: 'Azul',
  status: true,
  buyValue: 1800000,
}

export { carMock, carMockWithId, carChangeMock, carChangeMockWithId };