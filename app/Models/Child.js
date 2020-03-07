'use strict'

const Model = require('./InformagicModel')


class Child extends Model {
  static getInputProperties() {
    return [
      // 'id',
      'surname',
      'name',
      'patronymic',
      'dob'
    ]
  }

  /**
   * @param children-обьект со всей информацией о детях
   * @returns {[]}-массив объектов готовых для создания по ним модели
   */
  static getChildrenInfo(children) {
    const infoChildren = []
    for (let child of children) {
      infoChildren.push(this.getChildInfo(child))
    }
    return infoChildren
  }

  static getChildInfo(obj) {
    return this.getInfo(obj)
  }

  /**
   * @param children - массив с подготовленной информацией для создания инстанса
   * @param client - инстанс модели,куда будет привязано
   * делает:создает и привязывает детей к клиенту
   * @returns {Promise<void>}
   */
  static async fillChildren(children, client) {
    const childrenObj = Child.getChildrenInfo(children)
    await client.children()
      .createMany(childrenObj)
  }

  /**
   * @param children - массив с подготовленной информацией для создания инстанса
   * @param client - инстанс модели,куда будет привязано
   * делает:создает и привязывает детей к клиенту и удяляет старых
   * @returns {Promise<void>}
   */
  static async updateChildren(children, model) {
    if (children) {
      await model.children()
        .delete()
      await model.fillChildren(children)
    }
  }
}

module.exports = Child
