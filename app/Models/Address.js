'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./InformagicModel')
const Enum = require('./enum')

class Address extends Model {
  static get table() {
    return 'address'
  }

  static _type = new Enum('type', ['Reg', 'Liv', 'Job'])

  static getType() {
    return this._type
  }

  static getInputProperties() {
    return [
      // 'id',
      'zipCode',
      'region',
      'city',
      'street',
      'house',
      'block',
      'apartment'
    ]
  }

  static getAddressInfo(obj) {
    return this.getInfo(obj)
  }

  static async fillAddress(obj, relationship, model) {
    let addressInfo = Address.getAddressInfo(obj)
    if (model) {
      await relationship.update(addressInfo)
    } else {
      await relationship.create(addressInfo)
    }
  }

  static getRulesValidate() {
    return {
      zipCode: 'string',
      region: 'string',
      city: 'string',
      street: 'string',
      house: 'string',
      block: 'string',
      apartment: 'string'
    }
  }
}

module.exports = Address
