'use strict';

const Model = require('./InformagicModel');


class Child extends Model {
  static getInputProperties() {
    return ['id','surname', 'name', 'patronymic', 'dob']
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
  static getRulesValidate(){
    return {
      surname: 'string',
      name: 'string',
      patronymic: 'string',
      dob: 'date'
    }
  }
}

module.exports = Child;
