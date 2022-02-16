import GeocodingAPI from "./geocoding.service";
import calcEuclidianDistance from "../utils/calcEuclidianDistance";
import BadRequest from "../utils/BadRequestError";

const Geocoding = new GeocodingAPI();

interface address {
  addressName: string;
  location: { lat: number; lng: number };
  distance?: number;
}

async function resolveDistances(addresses: string[]) {
  if (addresses.length < 2)
    throw new BadRequest("There should be a minimum of two addresses");

  const searchedAddresses = await Promise.all(
    addresses.map(
      async (address, index) =>
        await Geocoding.getFormatedLocation(address, index)
    )
  );

  const addressDistances = searchedAddresses.map((address) => {
    const otherSpots = getRelationToOtherSpots(address, searchedAddresses);

    return { ...address, otherSpots };
  });

  return addressDistances;
}

function getRelationToOtherSpots(
  address: address,
  searchedAddresses: address[]
) {
  const otherSpots: any = { nearby: [], far: [] };

  for (const comparingAddress of searchedAddresses) {
    if (comparingAddress.addressName === address.addressName) continue;

    const distance = calcEuclidianDistance(
      address.location,
      comparingAddress.location
    );

    const spot = { ...comparingAddress, distance };

    if (distance < 10) otherSpots.nearby.push(spot);
    else otherSpots.far.push(spot);
  }

  for (const spot in otherSpots) {
    otherSpots[spot].sort((a: address, b: address) => a.distance - b.distance);
  }

  return otherSpots;
}

export { resolveDistances };
