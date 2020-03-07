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

  /**
   *
   * @param obj - обект с данными
   * @returns {{}} - обьект с полями для заполнения модели
   */
  static getInfo(obj) {
    const model = {}
    for (let key of this.getInputProperties()) {
      model[key] = obj[key]
    }
    return model
  }

  static boot() {
    super.boot()
    // чтобы можно было корректно валидировать модели
    this.addTrait('RulesValidate')
  }

  /**
   *
   * @param obj - обьект с информацией для адейте
   * делает:обновляет инстанс
   * @returns {Promise<void>}
   */
  async update(obj) {
    if (!InformagicModel.isDummy(obj)) {
      this.merge(obj)
      await this.save()
    }
  }

  /**
   *
   * @param obj - обьект для проверки
   * делает:проверяет,что есть хоть одно не пустое поле
   * @returns {boolean}
   */
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
