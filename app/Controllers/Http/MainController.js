'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Client = use('App/Models/Client')


class MainController {
  async index({ request }) {

    let sortBy = request.input('sortBy')
    sortBy = sortBy == null ? 'created_at' : sortBy
    let sortDir = request.input('sortDir')
    sortDir = sortDir == null ? 'desc' : sortDir
    let page = request.input('page')
    page = page == null ? 1 : page
    let limit = request.input('limit')
    limit = limit == null ? 10 : limit
    return Client.query()
      .orderBy(sortBy, sortDir)
      .paginate(page, limit)
  }

  async store({ request, response }) {
    const clientObj = JSON.parse(request.input('client'))
    const client = this.createClient(clientObj)

    const spouseObj = clientObj.spouse
    if (spouseObj) {
      spouseObj.spouse = client.id
      this.createClient(spouseObj)
    }

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
    return Client.Update(client, clientObj)
  }

//создание клиента и заполнение
  async createClient(clientObj) {
    let clientInfo = Client.getClientInfo(clientObj)
    let client = await Client.create(clientInfo)
    await client.fillClient(clientObj)
  }

}

module.exports = MainController
