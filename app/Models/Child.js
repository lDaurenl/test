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
   * принимает:массив с подготовленной информацией для создания
   * инстанса модели и клиента(инстанс модели) куда будут привязаны дети
   * делает:создает и привязывает детей к клиенту
   */
  static async fillChildren(children,client) {
    const childrenObj = Child.getChildrenInfo(children)
    await client.children()
      .createMany(childrenObj)
  }
  /**
   * принимает:массив обьектов с  информацией для создания
   * инстанса модели и клиента куда будут привязаны дети
   * делает:удаляет старых детей,создает и привязывает новых
   */
  static async updateChildren(children,model) {
    if (children) {
      await model.children()
        .delete()
      await model.fillChildren(children)
    }
  }
}

module.exports = Child
