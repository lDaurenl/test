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
    let address = new AddressClient();
    this.updateAddress(obj,type,idClient,address)
  }
  static async updateAddress(obj,type,idClient,address){
    if (await this.IsExistObject(obj, AddressClient)) {
      return null
    }
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
