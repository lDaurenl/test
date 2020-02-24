'use strict'

const { test, trait } = use('Test/Suite')('Client Crud')
trait('Test/ApiClient')
test('Create', async ({ client }) => {
  const response = client.post(client)
    .send(Client)
    .end()
  response.
})
