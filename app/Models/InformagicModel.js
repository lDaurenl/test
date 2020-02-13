'use strict';
const Database = use('Database');
const Model = use('Model');

//модель от которой унаследованны все модели пакета
class InformagicModel extends Model {
  static get incrementing() {
    return false
  }

  static get primaryKey() {
    return 'id'
  }

  static boot() {
    super.boot();
    //хук для генерации id
    this.addHook('beforeCreate', 'UuidHook.uuid')
  }

  //метод который дожен возвращать массив свойств,которые нужно вводить
  // Пользователю конкретно для этой модели,без вложенных моделей
  static getInputProperties() {
    throw new Error('вы не переопределили getInputProperties для модели: ' + this.toString())
  }

  //метод который должен возвращать массив свойств,по которому можно найти дупликаты
  static getKeyProperties() {
    throw new Error('вы не переопределили getKeyProperties для модели: ' + this.toString())
  }

 static async FindByObj(whereClause, modelType) {
    const query = Database.table(modelType.table);
    const row = await query.where(whereClause).first();
    if (row) {
      return row
    }
  }
 static async IsExistObject(obj, modelType) {
    let objKeys = {};
    let arrayKey = modelType.getKeyProperties();
    for (let key of arrayKey) {
      if (obj[key] == null) return false;
      else objKeys[key] = obj[key]
    }
    return (await this.FindByObj(objKeys, modelType) != null)
  }
}

module.exports = InformagicModel;
