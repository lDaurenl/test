'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./InformagicModel');

class AddressJob extends Model {
  static get table() {
    return 'AddressJobs';
  }

  static getInputProperties() {
    return ['zipCode', 'region', 'city', 'street', 'house', 'block', 'apartment']
  }

  static getKeyProperties() {
    return ['zipCode']
  }

  static async createAddress(obj) {
    if (await this.IsExistObject(obj, AddressJob)) {
      return null
    }
    let address = new AddressJob();
    for (let property of this.getInputProperties()) {
      address[property] = obj[property];
    }
    return address;
  }
}

module.exports = AddressJob;
