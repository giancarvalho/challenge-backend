interface location {
  lat: number;
  lng: number;
}

export default function calcEuclidianDistance(
  pointA: location,
  pointB: location
) {
  const { lat: latA, lng: lonA } = pointA;
  const { lat: latB, lng: lonB } = pointB;

  const earthRadius = 6371;
  const dLat = deg2rad(latB - latA);
  const dLon = deg2rad(lonB - lonA);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(latA)) *
      Math.cos(deg2rad(latB)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = earthRadius * c;
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
