## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Tech Debt's

* Implement custom decorators for proper phone / siret valiation with `libphonenumber-js` (https://stackoverflow.com/questions/58172602/isphonenumber-npm-class-validator-how-to-add-multiple-countries-code).
* Use typeorm-seeding instead straightforward seeding of initial data in migrations for proper separation of development and production env's.


