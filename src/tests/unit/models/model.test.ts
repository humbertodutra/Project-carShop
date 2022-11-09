import { expect } from "chai";
import sinon from "sinon";
import CarModel from "../../../models/Car.model";
import { Model } from "mongoose";
import {
  carChangeMockWithId,
  carMock,
  carChangeMock,
  carMockWithId,
} from "../../mocks/car.mock";

describe("Car Model", () => {
  const carModel = new CarModel();

  before(() => {
    sinon.stub(Model, "create").resolves(carMockWithId);
    sinon.stub(Model, "findOne").resolves(carMockWithId);
    sinon.stub(Model, "find").resolves([carMockWithId]);
    sinon.stub(Model, "findByIdAndDelete").resolves(carMockWithId);
    sinon.stub(Model, "findByIdAndUpdate").resolves(carChangeMockWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe("creating a new car", () => {
    it("successfully created", async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe("searching one car", () => {
    it("successfully found", async () => {
      const carFound = await carModel.readOne("62cf1fc6498565d94eba52cd");
      expect(carFound).to.be.deep.equal(carMockWithId);
    });
  });

  describe("searching for all cars", () => {
    it("successfully found", async () => {
      const carsFound = await carModel.read();
      expect(carsFound).to.be.deep.equal([carMockWithId]);
    });
  });

  describe("delete a car", () => {
    it("successfully deleted", async () => {
      const carDeleted = await carModel.delete("62cf1fc6498565d94eba52cd");
      expect(carDeleted).to.be.deep.equal(carMockWithId);
    });
  });

  describe("update a car", () => {
    it("succesfully updated", async () => {
      const carUpdated = await carModel.update(
        "62cf1fc6498565d94eba52cd",
        carChangeMock
      );
      expect(carUpdated).to.be.deep.equal(carChangeMockWithId);
    });
  });
});
