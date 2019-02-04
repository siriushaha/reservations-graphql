## Description


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

1. Register users

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
a. user Donna Harry
{
  "data": {
    "firstName": "Donna",
    "lastName": "Harry",
    "username": "donnaharry",
    "password": "abc123"
  }
}
b. user James Smith
{
  "data": {
    "firstName": "James",
    "lastName": "Smith",
    "username": "jamessmith",
    "password": "abc123"
  }
}

2. Get list of users
query Users {
  users  {
    id
    firstName
    lastName
    username
  }
}

3. Login as user James Smith
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

Result:
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

4. create new hotel
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

5. Get list of available hotels
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

6. Create new reservation

7. Get list of reservations per user

8. Get reservation per id







