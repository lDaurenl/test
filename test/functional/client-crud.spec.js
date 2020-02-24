'use strict'
const Client = require('./exampleModels/Client')
const responseClient = require('./exampleModels/responseClient')
const { test, trait } = use('Test/Suite')('Client Crud')
trait('Test/ApiClient')
test('CreateEmptyClient', async ({ client }) => {
  const emptyClient = Client.ClientEmpty
  const response = await client.post('/client')
    .send(emptyClient)
    .end()
  console.log(response)
  response.assertStatus(200)
  response.assertJSONSubset(responseClient.clientEmpty)
})
