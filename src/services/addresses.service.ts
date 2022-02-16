import GeocodingAPI from "./geocoding.service";
import calcEuclidianDistance from "../utils/calcEuclidianDistance";

const Geocoding = new GeocodingAPI();

async function resolveDistances(addresses: string[]) {
  const searchedAddresses = await Promise.all(
    addresses.map(
      async (address) => await Geocoding.getFormatedLocation(address)
    )
  );

  const addressDistances = searchedAddresses.map((address) => {
    let distances = [];

    for (const comparingAddress of searchedAddresses) {
      if (comparingAddress.addressName === address.addressName) continue;

      const distance = calcEuclidianDistance(
        address.location,
        comparingAddress.location
      );

      distances.push({ ...comparingAddress, distance });
    }

    return { ...address, distances };
  });

  return addressDistances;
}

export { resolveDistances };
