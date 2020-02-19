const Model = require('./InformagicModel')
const Enum = require('./enum')

class Job extends Model {
  static _typesWork = new Enum('type', ['main', 'pluralistically', 'owner / participant'])

  static boot() {
    super.boot()
    this.addHook('beforeDelete', 'DeleteHook.jobs')
  }

  setPhoneNumbers(phoneNumbers) {
    return JSON.stringify(phoneNumbers)
  }
  // address() {
  //   return this.hasOne('App/Models/AddressJob', 'id', 'idJob')
  // }

  static getInputProperties() {
    return [
      'id',
      'dateEmp',
      'dateDismissal',
      'companyName',
      'tin',
      'type',
      'jobTitle',
      'monIncome',
      'fioManager',
      'phoneNumbers',
      'site'
    ]
  }

  static getTypesWork() {
    return this._typesWork
  }

  static get traits() {
    return ['@provider:Morphable']
  }

  address() {
    return this.morphOne('App/Models/Address', 'id', 'idOwner', 'type', 'Job')
  }

  static getJobInfo(obj) {
    return this.getInfo(obj)
  }
  static getRulesValidate(){
    return {
      dateEmp: 'date',
      dateDismissal: 'date',
      companyName: 'string',
      tin: 'string',
      type: 'typeJob',
      jobTitle: 'string',
      monIncome: 'number',
      fioManager: 'string',
      address: 'address',
      site: 'string'
    }
  }

}

module.exports = Job
