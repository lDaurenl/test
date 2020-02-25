'use strict'
const Client = require('./exampleModels/Client')
const responseClient = require('./exampleModels/responseClient')
const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Client Crud')

trait('Test/ApiClient')

test('CreateEmptyClient', async ({ client }) => {
  const emptyClient = Client.ClientEmpty
  const response = await client.post('/client')
    .send(emptyClient)
    .end()
  response.assertStatus(200)
  response.assertJSONSubset(responseClient.clientEmpty)
})

test('CreateClientWrongValidate', async ({ client }) => {
  const ClientWrongValidate = Client.ClientWrongValidate
  const response = await client.post('/client')
    .send(ClientWrongValidate)
    .end()
  response.assertStatus(400)
  response.assertJSONSubset(responseClient.ClientWrongValidate)
})

test('ClientWithAddress', async ({ client }) => {
  const ClientWithAddress = Client.ClientWithAddress
  const response = await client.post('/client')
    .send(ClientWithAddress)
    .end()
  response.assertStatus(200)
  response.assertJSONSubset(responseClient.ClientWithAddress)
})

test('ClientWithAddress', async ({ client }) => {
  const ClientWithAddress = Client.ClientWithAddress
  const response = await client.post('/client')
    .send(ClientWithAddress)
    .end()
  response.assertStatus(200)
  response.assertJSONSubset(responseClient.ClientWithAddress)
})

test('ClientWithJobs', async ({ client }) => {
  const ClientWithJobs = Client.ClientWithJobs
  const response = await client.post('/client')
    .send(ClientWithJobs)
    .end()
  response.assertStatus(200)
  response.assertJSONSubset(responseClient.ClientWithJobs)
})

test('ClientFull', async ({ client }) => {
  const ClientFull = Client.ClientFull
  const response = await client.post('/client')
    .send(ClientFull)
    .end()
  response.assertJSONSubset(responseClient.ClientFull)
})
test('FindClient', async ({ client }) => {
  const clientModel = await Factory.model('App/Models/Client')
    .create()
  const response = await client.get(`client/${clientModel.id}`)
    .end()
  response.assertStatus(200)
  response.assertJSONSubset({
    surname: clientModel.surname,
    name: clientModel.name,
    patronymic: clientModel.patronymic
  })
})
test('FindNotExistsClient', async ({ client }) => {
  const response = await client.get(`client/046b6c7f-0b8a-43b9-b35d-6489e6daee91`)
    .end()
  response.assertStatus(404)
  response.assertJSONSubset({
    'code': 404,
    'key': 'E_MISSING_DATABASE_ROW'
  })
})
test('UpdateSurname', async ({ client }) => {
  const clientModel = await Factory.model('App/Models/Client')
    .create()
  const response = await client.patch(`client/${clientModel.id}`)
    .send({ client: { surname: 'Даурен' } })
    .end()
  response.assertStatus(200)
  response.assertJSONSubset({
    surname: 'Даурен'
  })
})
test('UpdateJobs', async ({ client }) => {
  const clientModel = await Factory.model('App/Models/Client')
    .create()
  const response = await client.patch(`client/${clientModel.id}`)
    .send(Client.ClientWithJobs)
    .end()
  response.assertStatus(200)
  response.assertJSONSubset(responseClient.ClientWithJobs)
})
test('UpdateFull', async ({ client }) => {
  const clientModel = await Factory.model('App/Models/Client')
    .create()
  const response = await client.patch(`client/${clientModel.id}`)
    .send(Client.ClientFull)
    .end()
  response.assertStatus(200)
  response.assertJSONSubset(responseClient.ClientFull)
})

