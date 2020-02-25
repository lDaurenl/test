'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Client = use('App/Models/Client')
const { validate } = use('Validator')
const Exception = use('App/Exceptions/ValidationException')
const BaseController = use('App/Controllers/Http/BaseController')

const RudRules = { id: 'required|UUID' }

class MainController extends BaseController {
  async index({ request, transform }) {

    const sortBy = request.input('sortBy', 'created_at')
    const sortDir = request.input('sortDir', 'desc')
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const clients = await Client.query()
      .orderBy(sortBy, sortDir)
      .paginate(page, limit)
    return transform.paginate(clients, 'ClientTransformer')
  }

  async store({ request, transform }) {
    const clientObj = request.input('client')
    await this.validate(clientObj, Client.getRulesValidate())
    let client = await Client.createClient(clientObj)
    await client.reload()
    const spouseObj = clientObj.spouse
    if (spouseObj) {
      const spouse = await Client.createClient(spouseObj)
      spouse.merge({ spouse: client.id })
      await spouse.save()
    }
    return transform.item(client, 'ClientTransformer')
  }

  async show({ params, transform }) {
    await this.validate(params, RudRules)
    let client = await Client.findOrFail(await params.id)
    return transform.item(client, 'ClientTransformer')
  }

  async destroy({ params }) {
    await this.validate(params, RudRules)
    const client = await Client.findOrFail(params.id)
    client.spouse()
      .delete()
    client.delete()
    return 'удалено'
  }

  async update({ request, params, transform }) {
    await this.validate(params, RudRules)
    const clientObj = request.input('client')
    const client = await Client.findOrFail(params.id)
    await this.updateClient(clientObj, client)
    const spouseObj = clientObj.spouse
    const spouse=await client.updateSpouse(spouseObj)
    await client.reload()
    return transform.item(client, 'ClientTransformer')
  }

  /**
   * принимает:обьект со всей информацией о клиенте,инстанс модели
   * возвращает:инстанс измененный модели
   */
  async updateClient(clientObj, client) {
    const clientInfo = await Client.getClientInfo(clientObj)
    await client.update(clientInfo)
    await client.updateClient(clientObj, client)
    return client
  }

}

module.exports = MainController
