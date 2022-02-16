# Geodistance

This API calculates the geodistance from multiple given addresses. 

## Features

- Get latitude and longitude of addresses
- Get distance in km from other given addresses

## Technologies

- node
- express
- jest
- Google geocodingAPI


## Requirements

- npm
- git
- Google API KEY

## How to use

The easiest way to use the API is to send a post request to the following URL: https://geodistance-challenge.herokuapp.com/addresses

The api expects an object containg two or more addresses:

```
{
    addresses: ["Rua 19 de Fevereiro, 34 Botafogo, Rio de Janeiro RJ, 22280030", "Rua Rafael Marino Neto, 600 - Jardim Karaíba, Uberlândia - MG, 38411-186", "Av. Anselmo Alves dos Santos, 3351 - Tibery, Uberlândia - MG, 38408-150"]
}

```

### Running locally

1- Clone this repository using ```git clone https://github.com/giancarvalho/challenge-backend.git```

2 - Run ```npm install``` 

3 - Create an .env with your google api key (following the env.example)

4 - Run ```npm run dev```

5 - Optionally, you can run ```npm test``` to run integration tests


## Endpoints guide



POST /addresses - needs an object with the following properties:

```
{
    addresses: ["Rua 19 de Fevereiro, 34 Botafogo, Rio de Janeiro RJ, 22280030", "Rua Rafael Marino Neto, 600 - Jardim Karaíba, Uberlândia - MG, 38411-186", "Av. Anselmo Alves dos Santos, 3351 - Tibery, Uberlândia - MG, 38408-150"]
}

```

From the following request, you'll get an array of addresses with the euclidian distance between them in km:

```
[
...
  {
    "addressName": "Rua Rafael Marino Neto, 600 - Jardim Karaíba, Uberlândia - MG, 38411-186, Brazil",
    "location": {
      "lat": -18.9477503,
      "lng": -48.2695478
    },
    "otherSpots": {
      "nearby": [
        {
          "addressName": "Av. Anselmo Alves dos Santos, 3351 - Santa Mônica, Uberlândia - MG, 38408-150, Brazil",
          "location": {
            "lat": -18.913595,
            "lng": -48.2307476
          },
          "distance": 5.575
        }
      ],
      "far": [
        {
          "addressName": "R. Dezenove de Fevereiro - Botafogo, Rio de Janeiro - RJ, 22280-030, Brazil",
          "location": {
            "lat": -22.9525906,
            "lng": -43.1869003
          },
          "distance": 690.432
        }
      ]
    }
  },
...
]


```
