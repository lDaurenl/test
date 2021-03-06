'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('Clients/Models/Client', (faker) => {
  return {
    surname: faker.username,
    name: faker.username,
    patronymic: faker.username,
    monIncome: Math.floor(Math.random())
  }
})
