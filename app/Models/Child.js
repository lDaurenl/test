'use strict';

const Model = require('./InformagicModel');


class Child extends Model {
  static getInputProperties() {
    return ['surname', 'name', 'patronymic', 'dob']
  }

  static  getChildrenInfo(children) {
    const infoChildren = []
    for (let child of children) {
      infoChildren.push( this.getChildInfo(child))
    }
    return infoChildren;
  }

  static  getChildInfo(obj) {
    return this.getInfo(obj);
  }
}

module.exports = Child;
