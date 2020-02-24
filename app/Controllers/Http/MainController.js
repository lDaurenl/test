'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Client = use('App/Models/Client')
const { validate } = use('Validator')
const Exception = use('App/Exceptions/ValidationException')
const BaseController=use('App/Controllers/Http/BaseController')

const RudRules={id:'required|UUID|existClient'}

class MainController extends  BaseController{
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
    const clientObj = JSON.parse(request.input('client'))
    await this.validate(clientObj,Client.getRulesValidate())
    let client = await this.createClient(clientObj)
    await client.reload()
    const spouseObj = clientObj.spouse
    if (spouseObj) {
      const spouse = await this.createClient(spouseObj)
      spouse.merge({ spouse: client.id })
      spouse.save()
    }
    return transform.item(client, 'ClientTransformer')
  }

  async show({ params ,transform}) {
    await this.validate(params,RudRules)
    let client = await Client.find(await params.id)
    return transform.item(await client.reload(), 'ClientTransformer')
  }

  async destroy({params}) {
    await this.validate(params,RudRules)
    const client=await Client.find(params.id);
    client.spouse().delete();
    client.delete()
    return 'удалено'
  }

  async update({ request, params, transform }) {
    await this.validate(params,RudRules)
    const clientObj = JSON.parse(request.input('client'))
    let client=Client.find(params.id).load();
    this.updateClient(clientObj,client)
    return transform.item(await client.reload(), 'ClientTransformer')
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
