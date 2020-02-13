'use strict'

const Model = require('./InformagicModel');

class Passport extends Model {
  static getInputProperties() {
    return ['series', 'number', 'giver', 'dateIssued', 'scope']
  }

  static getKeyProperties() {
    return ['series', 'number', 'scope']
  }

  static async createPassport(obj) {
    let passport = new Passport();
   return  this.UpdatePassport(obj,passport)
  }
  static async UpdatePassport(obj,passport){
    if (await this.IsExistObject(obj, Passport)) {
      return null
    }
    for (let property of this.getInputProperties()) {
      passport[property] = obj[property];
    }
    return passport;
  }
}

module.exports = Passport;
