'use strict'

const Model = require('./InformagicModel')

class Passport extends Model {
  static getInputProperties() {
    return ['series', 'number', 'giver', 'dateIssued','birthPlace']
  }

  static getPassportInfo(obj) {
    return this.getInfo(obj)
  }

  static getRulesValidate() {
    return{
      series:'string',
      number:'string',
      giver:'string',
      dateIssued:'date',
      birthPlace:'string'
    }
  }
}

module.exports = Passport
