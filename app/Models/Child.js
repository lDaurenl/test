'use strict';

const Model = require('./InformagicModel');


class Child extends Model {
  static getInputProperties() {
    return ['surname', 'name', 'patronymic', 'dob']
  }

  static getKeyProperties() {
    return ['id']
  }

 static async createChild(childObj, idClient) {
    if (await this.IsExistObject(childObj, Child)) {
      return null
    }
    let child = new Child();
    for (let property of this.getInputProperties()) {
      child[property] = childObj[property];
    }
    child.idClient = idClient;
    await child.save();
  }
 static async  createChildren(children, idClient) {
    for (let child of children) {
      await this.createChild(child, idClient)
    }
  }
}

module.exports = Child;
