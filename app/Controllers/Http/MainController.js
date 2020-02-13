'use strict';
const ClientModel = use('App/Models/Client');

class MainController {
  async index({request}) {

    let sortBy = request.input('sortBy');
    sortBy = sortBy == null ? 'created_at' : sortBy;
    let sortDir = request.input('sortDir');
    sortDir = sortDir == null ? 'desc' : sortDir;
    let page = request.input('page');
    page = page == null ? 1 : page;
    let limit = request.input('limit');
    limit = limit == null ? 10 : limit;
    return ClientModel.query().orderBy(sortBy, sortDir).paginate(page, limit);
  }

  async store({request,response}) {
    let clientObj = JSON.parse(request.input('client'));
    let client = await ClientModel.createClient(clientObj);
    if(client==null){
      return response.status(404).send('клиент с таким паспортом или ключевыми ' +
        'полями: ${Client.getKeyProperties()}' )
    }
    let spouseObj = clientObj.spouse;
    return client;
  }

  async show({request, params, response}) {
    let client = await ClientModel.find(await params.id);
    if (client == null) {
      return response.status(404).send('нет клиента с таким id')
    }

    return client;
  }
  async destroy({request, params, response}) {
    let client = await ClientModel.find(await params.id);
    if (client == null) {
      return response.status(404).send('нет клиента с таким id')
    }
    client.delete();
    return 'удалено'
  }

  async update({request, params, response}) {
    let client = await ClientModel.find(await params.id);
    let clientObj = request.input('client');
    if (client == null) {
      return response.status(404).send('нет клиента с таким id')
    }
    return CreateModel.UpdateClient(client, clientObj);
  }
}

module.exports = MainController;
