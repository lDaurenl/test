'use strict'

const Model = require('./InformagicModel')
const Enum = require('./enum')
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
  static _typeContact = new Enum('typeContact', ['email', 'value'])

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
      // 'id',
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

  setDocuments(documents) {
    return JSON.stringify(documents)
  }

  setCommunications(communications) {
    return JSON.stringify(communications)
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
    Child.updateChildren(children)
  }

  async updateJobs(jobs) {
    await Job.updateJobs(jobs, this)
  }

  async fillClient(obj) {
    this.fillPassport(obj.passport)
    this.fillLivAddress(obj.livingAddress)
    this.fillJobs(obj.jobs)
    this.fillRegAddress(obj.regAddress)
    this.fillChildren(obj.children)
  }

  async fillPassport(passport, model) {
    await Passport.fillPassport(passport, model, this)
  }

  async fillJobs(jobs) {
    await Job.fillJobs(jobs, this)
  }

  async fillRegAddress(address, model) {
    await Address.fillAddress(address, this.regAddress(), model)
  }

  async fillLivAddress(address, model) {
    await Address.fillAddress(address, this.livingAddress(), model)
  }

  async fillChildren(children) {
    await Child.fillChildren(children, this)
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
