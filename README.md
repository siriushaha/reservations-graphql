## Description

This is GraphQL API microservice based on Node NestJS framework with TypeGraphQL and TypeORM for a hotel reservation application.

Schema GraphQL:

```GraphQL
input CreateUserInput {
  firstName: String!
  lastName: String!
  username: String!
  password: String!
}

# The javascript `Date` as string. Type represents date and time as the ISO Date string.
scalar DateTime

type Hotel implements MetaData {
  createdAt: DateTime!
  updatedAt: DateTime!
  id: ID!
  name: String!
  address: String!
  phone: String!
  fax: String!
}

input HotelInput {
  name: String!
  address: String!
  phone: String!
  fax: String!
}

input LoginInput {
  username: String!
  password: String!
}

interface MetaData {
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Mutation {
  register(data: CreateUserInput!): User!
  login(data: LoginInput!): Token!
  createReservation(data: ReservationInput!): Reservation!
  updateReservation(data: ReservationInput!, id: ID!): Reservation!
  createHotel(data: HotelInput!): Hotel!
  updateHotel(data: HotelInput!, id: ID!): Hotel!
}

type Query {
  users: [User!]!
  reservations: [Reservation!]
  reservationById(id: ID!): Reservation
  hotels: [Hotel!]
  hotelById(id: Float!): Hotel!
}

type Reservation implements MetaData {
  createdAt: DateTime!
  updatedAt: DateTime!
  id: ID!
  name: String!
  hotelName: String!
  arrivalDate: DateTime!
  departureDate: DateTime!
  user: User!
  hotel: Hotel!
}

input ReservationInput {
  name: String!
  hotelName: String!
  arrivalDate: DateTime!
  departureDate: DateTime!
  hotelId: Float!
}

type Token implements MetaData {
  createdAt: DateTime!
  updatedAt: DateTime!
  id: ID!
  firstName: String!
  lastName: String!
  username: String!
  reservations: [Reservation!]
  accessToken: String!
}

type User implements MetaData {
  createdAt: DateTime!
  updatedAt: DateTime!
  id: ID!
  firstName: String!
  lastName: String!
  username: String!
  reservations: [Reservation!]
}
```



## How to Run

first clone the repository
then

```
npm install
```

and after that

```
npm start
```

then go to this [url](https://www.graphqlbin.com/v2/4RMru9) for testing the api
after login you should replace the authorization in http headers with the new access_token
then you can test the graphql:

http://localhost:3000/graphql

Register users

```
mutation User($data: CreateUserInput!){
  register(data: $data) {
    id
    firstName
    lastName
    username
    createdAt
    updatedAt
  }
}
```

  a. user Donna Harry

```
{
    "data": {
      "firstName": "Donna",
      "lastName": "Harry",
      "username": "donnaharry",
      "password": "abc123"
    }
}
```

  b. user James Smith

```
  {
    "data": {
      "firstName": "James",
      "lastName": "Smith",
      "username": "jamessmith",
      "password": "abc123"
    }
  }
```

Get list of users

```
query Users {
  users  {
    id
    firstName
    lastName
    username
  }
}
```

Login as user James Smith

```
mutation User ($data: LoginInput!) {
  login (data: $data) {
    id
    firstName
    lastName
    username
    accessToken
  }
}

{
  "data": {
    "username": "donnaharry",
    "password": "abc123"
  }
}
```

​	Result:

```
{
  "data": {
    "login": {
      "id": "3",
      "firstName": "Donna",
      "lastName": "Harry",
      "username": "donnaharry",
      "accessToken": "e30cb7b9-1672-462d-b9fa-f06116f15066"
    }
  }
}
```

Create new hotel

```
mutation Hotel($data: HotelInput!) {
  createHotel(data: $data) {
    id
    name
    address
    phone
    fax
    createdAt
    updatedAt
  }
}

{
  "data": {
    "name": "Four Seasons Hotel",
    "address": "1245 Santa Clara Drive, San Jose CA 94567",
    "phone": "408 345-5678",
    "fax": "408 345-5679"
  }
}

headers: 
{
  "authorization": "e30cb7b9-1672-462d-b9fa-f06116f15066" // note this is the access token returned from logged-in users
}
```

Get list of available hotels

```
query Hotels {
  hotels {
    id
    name
    address
    phone
    fax
    createdAt
    updatedAt
  }
}
```

Create new reservation

Get list of reservations per user

Get reservation per id








