'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Client = use('App/Models/Client')
const { validate } = use('Validator')
const Exception = use('App/Exceptions/ValidationException')

class MainController {
  async index({ request }) {

    const sortBy = request.input('sortBy', 'created_at')
    const sortDir = request.input('sortDir', 'desc')
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    return Client.find("f4537137-9669-438b-8b13-700643b734e1")
  }

  async store({ request, response }) {
    const clientObj = JSON.parse(request.input('client'))
    const validation = await validate(clientObj, Client.getRulesValidate())
    if (validation.fails()) {
      throw new Exception(validation.messages(), 409)
    }
    const client = await this.createClient(clientObj)
    const spouseObj = clientObj.spouse
    if (spouseObj) {
      spouseObj.spouse = client.id
      const spouse= await this.createClient(spouseObj)
    }
    console.log('sad')
    return client
  }

  async show({ request, params, response }) {
    let client = await Client.find(await params.id)
    if (client == null) {
      return response.status(404)
        .send('нет клиента с таким id')
    }

    return client
  }

  async destroy({ request, params, response }) {
    let client = await Client.find(await params.id)
    if (client == null) {
      return response.status(404)
        .send('нет клиента с таким id')
    }
    client.delete()
    return 'удалено'
  }

  async update({ request, params, response }) {
    let client = await Client.find(await params.id)
    let clientObj = JSON.parse(request.input('client'))
    if (client == null) {
      return response.status(404)
        .send('нет клиента с таким id')
    }

  }

  async createClient(clientObj) {
    let clientInfo = await Client.getClientInfo(clientObj)
    let client = await Client.create(clientInfo)
    await client.fillClient(clientObj)
    return client
  }

  async updateClient(clientObj, client) {
    let clientInfo = await Client.getClientInfo(clientObj)
    client.update(clientInfo)
    await client.updateClient(clientObj, client)
    return client
  }

}

module.exports = MainController
