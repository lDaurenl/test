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
  /**
   * принимает:обьект с информацией о паспорте,инстанс модели клиента
   * и инстанс модели паспорта,если он есть
   * делает:создает или изменяет инстанс модели работы
   * с заполненной информацией
   */
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
