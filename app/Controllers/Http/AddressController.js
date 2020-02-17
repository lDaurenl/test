'use strict';
const AddressModel = use('App/Models/Address');

class AddressController {
  async index({response}) {
    response.send(await AddressModel.all());
  }

  async store({request, response}) {
    let addressObj = JSON.parse(request.input('address'));
    let address =await AddressModel.createAddress(addressObj);
    if (address == null) {
      return response.status(400).send('уже существует обьект модели с индентичными'+
        `ключевыми полями:${AddressModel.getKeyProperties()}`);
    }
    response.send(address);
  }
}

module.exports = AddressController;
