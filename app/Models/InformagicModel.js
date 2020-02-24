'use strict'

const Model = use('Model')

// модель от которой унаследованны все модели пакета
class InformagicModel extends Model {
  static get incrementing() {
    return false
  }

  static get primaryKey() {
    return 'id'
  }

  // метод который дожен возвращать массив свойств,которые нужно вводить
  // Пользователю конкретно для этой модели,без вложенных моделей
  static getInputProperties() {
    throw new Error(`вы не переопределили getInputProperties для модели: ${this.toString()}`)
  }

  //метод который возвращает обьект с вводимыми полями
  static getInfo(obj) {
    const model = {}
    for (let key of this.getInputProperties()) {
      model[key] = obj[key]
    }
    return model
  }

  static boot() {
    super.boot()
    this.addHook('beforeCreate', 'UuidHook.uuid')
  }
}

module.exports = InformagicModel
