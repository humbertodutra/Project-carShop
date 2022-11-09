import { expect } from "chai";
import sinon from "sinon";
import { ZodError } from "zod";
import { ErrorTypes } from "../../../errors/catelog";
import CarModel from "../../../models/Car.model";
import CarService from "../../../services/Car.service";
import {
  carMock,
  carMockWithId,
  carChangeMock,
  carChangeMockWithId,
} from "../../mocks/car.mock";

describe("Car Service", () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, "create").resolves(carMockWithId);
    sinon.stub(carModel, "read").resolves([carMockWithId]);
    sinon
      .stub(carModel, "readOne")
      .onCall(0)
      .resolves(carMockWithId)
      .onCall(1)
      .resolves(null);
    sinon
      .stub(carModel, "delete")
      .onCall(0)
      .resolves(carMockWithId)
      .onCall(1)
      .resolves(null);
    sinon
      .stub(carModel, "update")
      .onCall(0)
      .resolves(carChangeMockWithId)
      .onCall(1)
      .resolves(null);
  });

  after(() => {
    sinon.restore();
  });

  describe("creating a car", () => {
    it("on successs", async () => {
      const createdCar = await carService.create(carMock);

      expect(createdCar).to.be.deep.equal(carMockWithId);
    });

    it("on failure", async () => {
      try {
        await carService.create({});
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
  });

  describe("reading cars", () => {
    it("return all cars", async () => {
      const foundCars = await carService.read();

      expect(foundCars).to.be.deep.equal([carMockWithId]);
    });
  });

  describe("reading one car", () => {
    it("on sucess", async () => {
      const foundCar = await carService.readOne(carMockWithId._id);

      expect(foundCar).to.be.deep.equal(carMockWithId);
    });
    it("on failure by not found", async () => {
      try {
        await carService.readOne(carMockWithId._id);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.NotFound);
      }
    });
    it("on failure by invalid id", async () => {
      try {
        await carService.readOne("IDERRADO");
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.InvalidId);
      }
    });
  });

  describe("delete a car", () => {
    it("on sucess", async () => {
      const deletedCar = await carService.delete(carMockWithId._id);

      expect(deletedCar).to.be.deep.equal(carMockWithId);
    });
    it("on failure by not found", async () => {
      try {
        await carService.delete(carMockWithId._id);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.NotFound);
      }
    });
    it("on failure by invalid id", async () => {
      try {
        await carService.delete("IDERRADO");
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.InvalidId);
      }
    });
  });

  describe("update a car", () => {
    it("on sucess", async () => {
      const updatedCar = await carService.update(
        carChangeMockWithId._id,
        carChangeMock
      );

      expect(updatedCar).to.be.deep.equal(carChangeMockWithId);
    });
    it("on failure by not found", async () => {
      try {
        await carService.update(carChangeMockWithId._id, carChangeMock);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.NotFound);
      }
    });
    it("on failure by invalid id", async () => {
      try {
        await carService.update("IDERRADO", carChangeMock);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.InvalidId);
      }
    });
    it("on failure by invalid params", async () => {
      try {
        await carService.update(carMockWithId._id, {});
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EmptyBody);
      }
    });
  });
});
