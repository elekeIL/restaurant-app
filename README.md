This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Restaurant API Documentation
 ## Table of Contents
* Introduction
* Endpoints
* GET
* POST
* PUT
* DELETE
* Request and Response Formats
* Error Handling
* Helper Functions


## Introduction
The Restaurant API provides endpoints for managing restaurant data, including operations such as retrieving restaurants, adding new restaurants, updating restaurant details, and deleting restaurants. This documentation outlines the usage of each API endpoint, expected request and response formats, and error handling procedures.


## Endpoints
## GET
Retrieve restaurants based on specified criteria such as city, latitude, longitude, and distance.

* Request
* Method: GET
* Query Parameters:
* city (required): The name of the city to search for restaurants.
* latitude (required): The latitude of the user's location.
* longitude (required): The longitude of the user's location.
* distance (optional): The maximum distance (in kilometers) within which to search for restaurants.
## Response
* Status Code: 200 (Success)
* body: {
  "message": "Success",
  "restaurants": [
  {
  "id": "3",
  "name": "Cafe Delight",
  "address": "123 Main St, New York, NY",
  "latitude": 40.7128,
  "longitude": -74.006
  }
  ]
  }

## POST
Add a new restaurant to the database.

Request
Method: POST
Body: JSON object representing the new restaurant.
{
"name": "Cafe",
"address": "123 Main St, New York, NY",
"latitude": 40.7112,
"longitude": -74.0055,
"cuisineType": "dessert";
"priceRange": "300";
"ratings": "3"
}

## Response
* Status Code: 201 (Success)
* body: {
  "message": "Added",
  "newRestaurant": {
  "name": "Cafe",
  "address": "123 Main St, New York, NY",
  "latitude": 40.7112,
  "longitude": -74.0055,
  "id": "25"
  }
  }

## PUT
Update details of an existing restaurant.

Request
Method: PUT
* Query Parameters:
* id (required): The id of the restaurant to be updated.
Body: JSON object representing the updated restaurant details.
{
"name": "Cafe",
"address": "123 Main St, New York, NY",
"latitude": 40.7112,
"longitude": -74.0055
}

## Response
* Status Code: 200 (Success)
* body: {
  "name": "Cafe",
  "address": "123 Main St, New York, NY",
  "latitude": 40.7112,
  "longitude": -74.0055
  }
  }

## DELETE
Delete a restaurant record based on its ID.

Request
Method: DELETE
* Query Parameters:
* id (required): The id of the restaurant to be deleted.

## Response
* Status Code: 200 (Success)
* body: {
  response: "restaurant deleted"
  }
  }


## Request and Response Formats
Request and response payloads are in JSON format.
Request methods: GET, POST, PUT, DELETE.

## Error Handling
In case of errors, the response will contain an error message and an appropriate status code.
Status Code 400: Bad Request - Indicates issues with the request parameters.
Status Code 500: Internal Server Error - Indicates an unexpected error on the server.



