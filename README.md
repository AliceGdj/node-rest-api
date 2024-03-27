# Simple REST API with NodeJS and MongoDB

This is a basic example of a Node REST API for handling the users of a website. The stack includes Express, Typescript, MongoDB and Mongoose. Session Cookies are used to manage the authentication part.

Before anything, install the dependencies:
```
npm install
```

To start the application, run:
```
npm run start
```

For the following, use Postman to test the requests

Make a POST request to register your user with the appropriate credentials:
```
POST http://localhost:8080/auth/register
{
    "email": "email1",
    "password": "password1",
    "username": "username1"
}
```

Make a POST request to login that user:
```
POST http://localhost:8080/auth/login
{
    "email": "email1",
    "password": "password1"
}
```

Make a GET request to retrieve all the users (you need to be previously logged in):
```
GET http://localhost:8080/users
If you are logged in you should see the cookie: "AUTH-SESSION"
```

Make a DELETE request to delete one user (you need to be previously logged in with that particular user):
```
DELETE http://localhost:8080/users/:id
If you are logged in you should see the cookie: "AUTH-SESSION"
```

Make a PATCH request to update the username of a user (you need to be previously logged in with that particular user):
```
PATCH http://localhost:8080/users/:id
If you are logged in you should see the cookie: "AUTH-SESSION"
```

... to be continued
