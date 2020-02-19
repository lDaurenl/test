'use strict'

const Model = require('./InformagicModel')
const Enum = require('./enum')
let c = 1
const Address = use('App/Models/Address')
const Passport = use('App/Models/Passport')
const Job = use('App/Models/Job')
const Child = use('App/Models/Child')

class Client extends Model {
  static _statuses = new Enum('status', [
    'lead', 'potential', 'notTarget',
    'consultation', 'application', 'deal', 'transactionParticipant', 'rejection'
  ])

  static _typesEducation = new Enum('typeEducation', [
    'secondary',
    'secondarySpecial', 'incompleteHigher', 'higher', 'twoOrMoreHigher', 'academicDegree'
  ])

  static _maritalStatuses = new Enum('maritalStatus', [
    'single', 'married',
    'widower/widow', 'inDivorce', 'civilMarriage'
  ])

  static _typesEmp = new Enum('typeEmp', [
    'employee', 'iE',
    'owner/co-owner', 'retiree', 'unemployed'
  ])

  static getKeyProperties() {
    return ['scope']
  }

  static getStatuses() {
    return this._statuses
  }

  static getTypesEducation() {
    return this._typesEducation
  }

  static getMaritalStatuses() {
    return this._maritalStatuses
  }

  static getTypesEmp() {
    return this._typesEmp
  }

  static getInputProperties() {
    return [
      'surname',
      'name',
      'patronymic',
      'nameChange',
      'dob',
      'birthCountry',
      'citizenship',
      'snils',
      'tin',
      'status',
      'typeEducation',
      'maritalStatus',
      'generalExp',
      'curWorkExp',
      'curFieldExp',
      'typeEmp',
      'monIncome',
      'monExpenses',
      'scope',
      'files',
      'documents',
      'communications'
    ]
  }

  static boot() {
    super.boot()
    this.addHook('beforeDelete', 'DeleteHook.client')
  }

  static get traits() {
    return ['@provider:Morphable']
  }

  passport() {
    return this.hasOne('App/Models/Passport', 'id', 'idClient')
  }

  children() {
    return this.hasMany('App/Models/Child', 'id', 'idClient')
  }

  jobs() {
    return this.hasMany('App/Models/Job', 'id', 'idClient')
  }

  spouse() {
    return this.hasOne('App/Models/Client', 'id', 'spouse')
  }

  regAddress() {
    return this.morphOne('App/Models/Address', 'id', 'idOwner', 'type', 'Reg')
  }

  livingAddress() {
    return this.morphOne('App/Models/Address', 'id', 'idOwner', 'type', 'Liv')
  }


  getDocuments(documents) {
    if (typeof documents=='string') {
      return JSON.parse(documents)
    }
    return documents;
  }

  setDocuments(documents) {
    return JSON.stringify(documents)
  }

  getCommunications(communications) {
    if (typeof communications=='string') {
      return JSON.parse(communications)
    }
    return communications;
  }

  setCommunications(communications) {
    return JSON.stringify(communications)
  }

  getFiles(files) {
    if (typeof files=='string') {
      return JSON.parse(files)
    }
    return files;
  }

  setFiles(files) {
    return JSON.stringify(files)
  }

  async updateClient(obj) {
    this.updateJobs(obj.jobs)
    this.updateChildren(obj.children)

    if (obj.passport) {
      this.fillPassport(obj.passport, this.passport())
    }
    if (obj.regAddress) {
      this.fillRegAddress(obj.regAddress, this.regAddress())
    }
    if (obj.livingAddress) {
      this.fillLivAddress(obj.livingAddress, this.passport())
    }
  }

  async updateChildren(children) {
    if (children) {
      this.children()
        .delete()
      this.fillChildren(children)
    }
  }

  async updateJobs(jobs) {
    if (jobs) {
      this.jobs()
        .delete()
      this.fillJobs(jobs)
    }
  }

  async fillClient(obj) {
    this.fillPassport(obj.passport)
    this.fillLivAddress(obj.livingAddress)
    this.fillJobs(obj.jobs)
    this.fillRegAddress(obj.regAddress)
    this.fillChildren(obj.children)
  }

  async fillPassport(passport, model) {
    const passportObj = Passport.getPassportInfo(passport)
    if (model) {
      await this.passport()
        .update(passportObj)
    } else {
      await this.passport()
        .create(passportObj)
    }
  }

  async fillJobs(jobs) {
    for (let jobObj of jobs) {
      let jobInfo = Job.getJobInfo(jobObj)
      let job = await this.jobs()
        .create(jobInfo)
      if (!jobObj.address) {
        continue
      }
      let addressInfo = Address.getAddressInfo(jobObj.address)
      await job.address()
        .create(addressInfo)
    }
  }

  async fillRegAddress(address, model) {
    const regAddress = Address.getAddressInfo(address)
    if (model) {
      await this.regAddress()
        .update(regAddress)
    } else {
      await this.regAddress()
        .create(regAddress)
    }
  }

  async fillLivAddress(address, model = null) {
    const livingAddress = Address.getAddressInfo(address)
    if (model) {
      await this.livingAddress()
        .update(livingAddress)
    } else {
      await this.livingAddress()
        .create(livingAddress)
    }
  }

  async fillChildren(children) {
    const childrenObj = Child.getChildrenInfo(children)
    await this.children()
      .createMany(childrenObj)
  }

  static getClientInfo(obj) {
    return this.getInfo(obj)
  }

  static getRulesValidate() {
    const spouseRules = this.getRulesValidateSpouse()
    spouseRules.spouse = 'spouse'
    return spouseRules
  }

  static getRulesValidateSpouse() {
    return {
      surname: 'string',
      name: 'string',
      patronymic: 'string',
      nameChange: 'boolean',
      dob: 'date',
      children: 'children',
      citizenship: 'string',
      snils: 'string',
      tin: 'string',
      status: 'status',
      regAddress: 'address',
      livingAddress: 'address',
      jobs: 'jobs',
      typeEducation: 'typeEducation',
      maritalStatus: 'maritalStatus',
      generalExp: 'number',
      curWorkExp: 'number',
      curFieldExp: 'number',
      typeEmp: 'typeEmp',
      monIncome: 'number',
      monExpenses: 'number',
      passport: 'passport',
      files: 'arrayUUID',
      documents: 'arrayUUID',
      communications: 'arrayUUID'
    }
  }
}

module.exports = Client
