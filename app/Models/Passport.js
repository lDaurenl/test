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
   *
   * @param passport - объект с данными о паспорте
   * @param model - модель паспорта,если есть
   * @param client - клиент куда будет привязан пасспорт
   * делает:создает или изменяет инстанс модели паспорта
   * @returns {Promise<void>}
   */
  static async fillPassport(passport, model, client) {
    const passportObj = Passport.getPassportInfo(passport)
    if (model && await model.load()) {
      await client.passport()
        .update(passportObj)
    } else {
      await client.passport()
        .create(passportObj)
    }
  }
}

module.exports = Passport
