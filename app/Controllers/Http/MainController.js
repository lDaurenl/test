'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Client = use('App/Models/Client')
const { validate } = use('Validator')
const Exception = use('App/Exceptions/ValidationException')
const BaseController = use('App/Controllers/Http/BaseController')
const NATS = require('nats')
const nc = NATS.connect({ json: true })

class MainController extends BaseController {
  async index({ request, transform }) {
    await this.validate(request.all(), this.getIndexRules())
    const sortBy = request.input('sortBy', 'created_at')
    const sortDir = request.input('sortDir', 'desc')
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const clients = await Client.query()
      .orderBy(sortBy, sortDir)
      .paginate(page, limit)
    return this.paginateResponse(clients, transform)
  }

  async paginateResponse(clients, transform) {
    const paginate = await transform.paginate(clients, 'ClientTransformer')
    for (const item in paginate.pagination) {
      paginate[item] = paginate.pagination[item]
    }
    delete paginate.pagination
    return paginate
  }

  async store({ request, transform }) {
    const clientObj = request.input('client')
    await this.validate(clientObj, Client.getRulesValidate())
    let client = await Client.createWithNesting(clientObj)
    await client.reload()
    await client.createSpouse(clientObj.spouse)
    const message =await transform.item(client, 'ClientTransformer')
    nc.publish('clientCreated',message)
    return message;

  }

  async show({ params, transform }) {
    await this.validate(params)
    let client = await Client.findOrFail(await params.id)
    return transform.item(client, 'ClientTransformer')
  }

  async destroy({ params }) {
    await this.validate(params)
    const client = await Client.findOrFail(params.id)
    nc.publish('deletedClient',{idClient:client.id})
    await client.spouse()
      .delete()
    await client.delete()
    return'Данные клиента успешно удалены';
  }

  async update({ request, params, transform }) {
    await this.validate(params)
    const clientObj = request.input('client')
    const client = await Client.findOrFail(params.id)
    await client.updateWithNesting(clientObj)
    const spouseObj = clientObj.spouse
    const spouse = await client.updateSpouse(spouseObj)
    await client.reload()
    const message=await transform.item(client, 'ClientTransformer')
    nc.publish('updatedClient',message);
    return message;
  }
}

module.exports = MainController
