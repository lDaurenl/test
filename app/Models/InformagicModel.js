'use strict'

const Model = use('Model')

// модель от которой унаследованны все модели пакета
class InformagicModel extends Model {

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
    //хук для генерации uuid и трейт,
    // чтобы можно было корректно валидировать модели
    this.addHook('beforeCreate', 'UuidHook.uuid')
    this.addTrait('RulesValidate')
  }

  async update(obj) {
    if (!InformagicModel.isDummy(obj)) {
      this.merge(obj)
      await this.save()
    }
  }
//проверка на то,что объкт имеет хоть одно не пустое поле
  static isDummy(obj) {
    for (const key in obj) {
      if (obj[key] !== undefined) {
        return false
      }
    }
    return true
  }
}

module.exports = InformagicModel
