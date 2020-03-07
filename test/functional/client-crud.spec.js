'use strict'
const requireClient = require('./exampleModels/Client')
const responseClient = require('./exampleModels/responseClient')
const Client = use('App/Models/Client')
const Address = use('App/Models/Address')
const Jobs = use('App/Models/Job')
const Child = use('App/Models/Child')
const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Client Crud')

trait('Test/ApiClient')

test('CreateEmptyClient', async ({ client }) => {
  const emptyClient = requireClient.ClientEmpty
  const response = await client.post('/client')
    .send(emptyClient)
    .end()
  response.assertStatus(200)
  response.assertJSONSubset(responseClient.clientEmpty)
})

test('CreateClientWrongValidate', async ({ client }) => {
  const ClientWrongValidate = requireClient.ClientWrongValidate
  const response = await client.post('/client')
    .send(ClientWrongValidate)
    .end()
  response.assertStatus(400)
  response.assertJSONSubset(responseClient.ClientWrongValidate)
})

test('ClientWithAddress', async ({ client }) => {
  const ClientWithAddress = requireClient.ClientWithAddress
  const response = await client.post('/client')
    .send(ClientWithAddress)
    .end()
  response.assertStatus(200)
  response.assertJSONSubset(responseClient.ClientWithAddress)
})

test('ClientWithAddress', async ({ client }) => {
  const ClientWithAddress = requireClient.ClientWithAddress
  const response = await client.post('/client')
    .send(ClientWithAddress)
    .end()
  response.assertStatus(200)
  response.assertJSONSubset(responseClient.ClientWithAddress)
})

test('ClientWithJobs', async ({ client }) => {
  const ClientWithJobs = requireClient.ClientWithJobs
  const response = await client.post('/client')
    .send(ClientWithJobs)
    .end()
  response.assertStatus(200)
  response.assertJSONSubset(responseClient.ClientWithJobs)
})

test('ClientFull', async ({ client }) => {
  const ClientFull = requireClient.ClientFull
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
    .send(requireClient.ClientWithJobs)
    .end()
  response.assertStatus(200)
  response.assertJSONSubset(responseClient.ClientWithJobs)
})
test('UpdateFull', async ({ client }) => {
  const clientModel = await Factory.model('App/Models/Client')
    .create()
  const response = await client.patch(`client/${clientModel.id}`)
    .send(requireClient.ClientFull)
    .end()
  response.assertStatus(200)
  response.assertJSONSubset(responseClient.ClientFull)
})
test('DeleteClient', async ({ client, assert }) => {
  const clientModel = await Factory.model('App/Models/Client')
    .create()
  const response = await client.delete(`client/${clientModel.id}`)
    .end()
  const model = await Client.find(clientModel.id)
  assert.equal(model, null)
  response.assertStatus(200)
  response.assertText('Данные клиента успешно удалены')
})
test('DeleteWithAddress', async ({ client, assert }) => {
  const clientModel = await Factory.model('App/Models/Client')
    .create()
  await clientModel.updateWithNesting(requireClient.ClientWithAddress.client)
  let address = await clientModel.regAddress()
    .fetch()
  const response = await client.delete(`client/${clientModel.id}`)
    .end()
  const model = await Client.find(clientModel.id)
  address = await Address.find(address.id)
  assert.equal(model, null)
  assert.equal(address, null)
  response.assertStatus(200)
  response.assertText('Данные клиента успешно удалены')
})
test('DeleteFullNestedModel', async ({ client, assert }) => {
  const clientModel = await Factory.model('App/Models/Client')
    .create()
  await clientModel.updateWithNesting(requireClient.ClientFull.client)
  let children = await clientModel.children()
    .load()
  let jobs = await clientModel.jobs()
    .load()
  const response = await client.delete(`client/${clientModel.id}`)
    .end()
  await nestingIsEmpty(await getNestingModels(clientModel), assert)
  await nestingManyIsEmpty(jobs['rows'], assert, Jobs)
  await nestingManyIsEmpty(children['rows'], assert, Child)
  response.assertStatus(200)
  response.assertText('Данные клиента успешно удалены')
})
test('getOnePage', async ({ client }) => {
  await Factory.model('App/Models/Client')
    .createMany(10)
  const response = await client.get('/client')
    .end()
  response.assertStatus(200)
  response.assertJSONSubset({ page: 1 })
})
test('getWrongValidation', async ({ client }) => {
  await Factory.model('App/Models/Client')
    .createMany(10)
  const response = await client.get('/client')
    .send({ page: 'sdasd' })
    .end()
  response.assertStatus(400)
  response.assertJSONSubset({
    code: 400,
    key: 'E_VALIDATION_FAILED'
  })
})
test('getPage', async ({ client }) => {
  await Factory.model('App/Models/Client')
    .createMany(10)
  const response = await client.get('/client')
    .send({ page: 2 })
    .end()
  response.assertStatus(200)
  response.assertJSONSubset({ page: 2 })
})
test('getOrder', async ({ client, assert }) => {
  await Factory.model('App/Models/Client')
    .createMany(10)
  const response = await client.get('/client')
    .send({
      page: 2,
      sortBy: 'monIncome',
      sortDir: 'asc',
      limit: 4
    })
    .end()
  response.assertStatus(200)
  response.assertJSONSubset({
    page: 2,
    perPage: 4
  })
  const body = response.body
  for (let i = 0; i < 3; i++) {
    if(body[i]&&body[i+1])
    assert.equal('true', body[i] > body[i + 1])
  }
})

async function nestingIsEmpty(nestedModels, assert) {
  for (let model of nestedModels) {
    if (model) {
      model = await model.constructor.find(model.id)
      assert.equal(model, null)
    }
  }
}

async function nestingManyIsEmpty(nestedModels, assert, constructor) {
  for (let model of nestedModels) {
    if (model) {
      model = await constructor.find(model.id)
      assert.equal(model, null)
    }
  }
}

async function getNestingModels(clientModel) {
  let regAddress = await clientModel.regAddress()
    .load()
  let livingAddress = await clientModel.livingAddress()
    .load()
  let passport = await clientModel.passport()
    .load()
  return [regAddress, livingAddress, passport]
}

