# GovTech ENP Technical Assessment

## How to run

In the root folder, run `docker-compose up --build`

The website will be visible at [this link](http://localhost:3000/).

The server is hosted at port 8080 and the database is hosted at port 5432.

At the root folder, run `docker compose run frontend npm test` and `docker compose run backend npm test` to run the tests for the frontend and backend components respectively.

## Frontend

Tech Stack used:

- React + Vite

- UI Library: Material UI

- Testing Library: Jest

## Backend

Tech Stack used:

- Node.js + Express

- API:
  - /api/shorten: shortens the original URL and stores the original URL with its corresponding generated string in the database

  - /:shorturl: redirects the user to the original URL that was shortened

- Testing Libraries: Mocha and Chai

## Database

- PostgreSQL

- Schema: **longurl** (Primary key VARCHAR, original URL that user entered), **shorturl** (VARCHAR(30), randomly generated string corresponding to the original URL)
