## Installation

To use the Ultra Test appllication, you must have [NodeJS](https://nodejs.org/en/download/) version 16 or higher on your machine or use [Docker](https://docs.docker.com/desktop/).

Download repo and run it with Docker containers. 

## Requirements

Based no PDF with "Coding Test" few next requirements was defined as API proposal:

1. Full CRUD API endpoints for simple "Game" entity
    * Ability to create Game entity without Publisher, Tags or Discouts related to the game or drop all this data on editing
    * Unique key for Game Title
2. Game Entity list endpoint wih ability to fetch lists, limit it this list by count and offsetting it from start
3. Game Publisher endpoint, where Publiser entity can be fetched with relation to current game
4. API Enpoint to trigger Games update job based on releaseDate field

## Architecture

<a href="https://imgur.com/i35pw5C"><img src="https://i.imgur.com/i35pw5C.png" title="source: imgur.com" /></a>

## Running the app

```bash
# development
$ npm run dev:docker
```

## Test

All related Postman requests can be found in separated collection.

```bash
# e2e tests
$ npm run test:e2e:docker

```

## Tech Debt's

* Implement custom decorators for proper phone / siret valiation with `libphonenumber-js` (https://stackoverflow.com/questions/58172602/isphonenumber-npm-class-validator-how-to-add-multiple-countries-code).

* Use typeorm-seeding instead straightforward seeding of initial data in migrations for proper separation of development and production env's.

* Use proper environment separation between development and production.

* Move Redis queue definitions into configuration fil nd use it both for jobs Producer and Consumer.

* Write E2E tests for given testing environment.


