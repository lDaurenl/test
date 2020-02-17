'use strict'

const Model = require('./InformagicModel')

class Passport extends Model {
  static getInputProperties() {
    return ['series', 'number', 'giver', 'dateIssued', 'scope']
  }

  static getPassportInfo(obj) {
    return this.getInfo(obj)
  }
}

module.exports = Passport
