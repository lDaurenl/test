'use strict'

const Model = require('./InformagicModel')

class Passport extends Model {
  static getInputProperties() {
    return [
      // 'id',
      'series',
      'number',
      'giver',
      'dateIssued',
      'birthPlace'
    ]
  }

  static getPassportInfo(obj) {
    return this.getInfo(obj)
  }

  static getRulesValidate() {
    return {
      series: 'string',
      number: 'string',
      giver: 'string',
      dateIssued: 'date',
      birthPlace: 'string'
    }
  }

  static async fillPassport(passport, model, client) {
    const passportObj = Passport.getPassportInfo(passport)
    if (model) {
      await client.passport()
        .update(passportObj)
    } else {
      await client.passport()
        .create(passportObj)
    }
  }
}

module.exports = Passport
