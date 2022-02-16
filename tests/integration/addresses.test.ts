import supertest from "supertest";
import app from "../../src/app";
import * as AddressFactory from "../factory/address.factory";
import GeoCoding from "../../src/services/geocoding.service";

const sut = supertest(app);
const mockGeocoding = new GeoCoding();

describe("POST /addresses", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return a list of addresses with otherSpots property", async () => {
    const addresses = AddressFactory.generateRandomAddresses(3).map(
      (address) => address.addressName
    );

    jest
      .spyOn(mockGeocoding, "getLocationData")
      .mockImplementationOnce(async (addressName) =>
        AddressFactory.getAddress(addressName)
      );

    const result = await sut.post("/addresses").send({ addresses });

    expect(result.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          otherSpots: expect.objectContaining({
            far: expect.any(Array),
            nearby: expect.any(Array),
          }),
        }),
      ])
    );
  });

  it("throws a 400 error if less than two addresses are sent", async () => {
    const addresses = AddressFactory.generateRandomAddresses(1).map(
      (address) => address.addressName
    );

    const result = await sut.post("/addresses").send({ addresses });

    expect(result.status).toBe(400);
  });

  it("throws a 400 error if an invalid address is sent", async () => {
    const addresses = AddressFactory.generateRandomAddresses(2).map(
      (address) => address.addressName
    );

    addresses.push("");

    const result = await sut.post("/addresses").send({ addresses });

    expect(result.status).toBe(400);
  });
});
