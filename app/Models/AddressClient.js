'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./InformagicModel');
const Enum = require('./enum');

class AddressClient extends Model {
  static get table() {
    return 'AddressClients';
  }

  static _type = new Enum('type', ['Reg', 'Liv']);

  static getType() {
    return this._type;
  }

  static getInputProperties() {
    return ['zipCode', 'region', 'city', 'street', 'house', 'block', 'apartment']
  }

  static getKeyProperties() {
    return ['id']
  }

  static async createAddress(obj,type,idClient) {
    if (await this.IsExistObject(obj, AddressClient)) {
      return null
    }
    let address = new AddressClient();
    this.IsExistObject(obj, AddressClient);
    for (let property of this.getInputProperties()) {
      address[property] = obj[property];
    }
    address.idClient=idClient;
    address.type=type;
    await address.save();
    return address;
  }
}

module.exports = AddressClient;
