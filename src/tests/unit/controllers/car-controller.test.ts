import { expect } from "chai";
import * as sinon from "sinon";
import { Request, Response } from "express";
import { carMock, carMockWithId } from "../../mocks/car.mock";
import CarModel from "../../../models/Car.model";
import CarService from "../../../services/Car.service";
import CarController from "../../../controllers/Car.controller";

describe("Car Controller", () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, "create").resolves(carMockWithId);
    sinon.stub(carService, "read").resolves([carMockWithId]);
    sinon.stub(carService, "readOne").resolves(carMockWithId);
    sinon.stub(carService, "delete").resolves(carMockWithId);
    sinon.stub(carService, "update").resolves(carMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub().returns(res);
  });
  after(() => {
    sinon.restore();
  });

  describe("create a car", () => {
    it("successfully created", async () => {
      req.body = carMock;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be
        .true;
    });
  });

  describe("searching for all cars", () => {
    it("successfully founded", async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMockWithId])).to.be
        .true;
    });
  });

  describe("searching for one car", () => {
    it("successfully founded", async () => {
      req.params = { id: carMockWithId._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be
        .true;
    });
  });

  describe("delete a car", () => {
    it("successfully deleted", async () => {
      req.params = { id: carMockWithId._id };
      await carController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.end as sinon.SinonStub).calledWith()).to.be.true;
    });
  });

  describe("update a car", () => {
    it("successfully updated", async () => {
      req.params = { id: carMockWithId._id };
      req.body = carMock;

      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be
        .true;
    });
  });
});
