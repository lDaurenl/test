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
    return ['zipCode', 'region', 'city', 'street', 'house', 'block', 'apartment']
  }

  static getAddressInfo(obj) {
    return this.getInfo(obj)
  }
}

module.exports = Address
