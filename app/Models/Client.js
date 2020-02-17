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


  getDocuments() {
    return JSON.parse(this.documents)
  }

  setDocuments(documents) {
    this.documents = JSON.stringify(documents)
  }

  getCommunications() {
    return JSON.parse(this.communications)
  }

  setCommunications(communications) {
    this.communications = JSON.stringify(communications)
  }

  getFiles(files) {
    return JSON.parse(files)
  }

  setFiles(files) {
    return JSON.stringify(files)
  }

  async fillClient(obj){
    this.fillPassport(obj.passport)
    this.fillJobs(obj.jobs)
    this.fillRegAddress(obj.regAddress)
    this.livingAddress(obj.livingAddress)
    this.fillChildren(obj.children)
  }

  async fillPassport(passport) {
    const passportObj = Passport.getPassportInfo(passport)
    await this.passport()
      .create(passportObj)
  }

  async fillJobs(jobs) {
    for (let jobObj of jobs) {
      let jobInfo = Job.getJobInfo(jobObj)
      let job = await this.jobs()
        .create(jobInfo)
      let addressInfo = Address.getAddressInfo(jobObj.address)
      await job.address()
        .create(addressInfo)
    }
  }

  async fillRegAddress(address) {
    const regAddress = Address.getAddressInfo(address)
    await this.regAddress()
      .create(regAddress)
  }

  async fillLivAddress(address) {
    const livingAddress = Address.getAddressInfo(address)
    await this.livingAddress()
      .create(livingAddress)
  }
  async fillChildren(children) {
    const childrenObj = Child.getChildrenInfo(clientObj.children)
    await this.children()
      .createMany(children)
  }

  static getClientInfo(obj) {
    return this.getInfo(obj)
  }
}

module.exports = Client
