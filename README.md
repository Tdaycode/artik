# Artik

Backend REST API on Node.js 14.16.0 + Express.js + Mongoose.

## Quick Start to run locally

## Clone Repo

## Run npm install

## Setup Mongodb(Atlas or compass). Get connection string/url

## Create .env file

    Create .env file in project folder
    Enter these lines:

      DB_STRING = mongodb://localhost:27017/artik
      DB_STRING_PROD = mongodb db live for production
      NODE_ENV = development or production
      JWT_SECRET=thisisasamplesecret
      JWT_ACCESS_EXPIRATION_MINUTES=3
      JWT_REFRESH_EXPIRATION_DAYS=30
      DB_TEST_STRING = mongodb://localhost:27017/artik

## Start App
    npm start for production
    npm run dev - development
## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
```

## API Documentation

POSTMAN 
https://documenter.getpostman.com/view/17159517/Uz5NiY4u



## Validation

Request data is validated using [Joi](https://joi.dev/).
The validation schemas are defined in the `/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

## Test
  npm run test
