function generateRandomAddresses(n: number) {
  const sortedAddresses = addresses.sort(() => 0.5 - Math.random());
  return sortedAddresses.slice(0, n);
}

function getAddress(addressName: string) {
  const data = [
    addresses.find((mockAddress) => (addressName = mockAddress.addressName)),
  ];

  return data;
}

const addresses = [
  {
    addressName:
      "Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil",
    location: {
      lat: -22.8973551,
      lng: -43.1802782,
    },
  },
  {
    addressName:
      "Praça Mal. Âncora, 122 - Centro, Rio de Janeiro - RJ, 20021-200, Brazil",
    location: {
      lat: -22.9039608,
      lng: -43.1703536,
    },
  },
  {
    addressName:
      "R. Dezenove de Fevereiro, 34 - Botafogo, Rio de Janeiro - RJ, 22280-030, Brazil",
    location: {
      lat: -22.9507467,
      lng: -43.1876525,
    },
  },
  {
    addressName:
      "Rua Rafael Marino Neto, 600 - Jardim Karaíba, Uberlândia - MG, 38411-186, Brazil",
    location: {
      lat: -18.9477503,
      lng: -48.2695478,
    },
    distance: 687.094,
  },
  {
    addressName:
      "Av. Anselmo Alves dos Santos, 3351 - Santa Mônica, Uberlândia - MG, 38408-150, Brazil",
    location: {
      lat: -18.913595,
      lng: -48.2307476,
    },
    distance: 92.698,
  },
];

export { addresses, getAddress, generateRandomAddresses };
