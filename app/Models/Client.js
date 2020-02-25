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

  /**
   * принимает:обьект со всей информацией о клиенте
   * делает:изменяет модель клиенат по информации из объекта
   */
  async updateClient(obj) {
    await this.updateJobs(obj.jobs)
    await this.updateChildren(obj.children)
    if (obj.passport) {
      await this.fillPassport(obj.passport, this.passport())
    }
    if (obj.regAddress) {
      await this.fillRegAddress(obj.regAddress, this.regAddress())
    }
    if (obj.livingAddress) {
      await this.fillLivAddress(obj.livingAddress, this.passport())
    }
  }
  /**
   * принимает:обьект со всей информацией о клиенте
   * возвращает:новый инстанс заполненной модели
   */
  static async create(clientObj,trx) {
    let clientInfo = await Client.getClientInfo(clientObj)
    let client = await Client.create(clientInfo)
    await client.fillClient(clientObj)
    return client
  }

  //обновление супруги
  async updateSpouse(spouse) {
    if (!spouse) return
    if (await this.spouse()
      .load()) {
      spouse = await Client.updateClient(spouse)
    } else {
      spouse = await Client.createClient(spouse)
    }
    spouse.merge({ spouse: this.id })
    await spouse.save()
  }

  /**
   *принимает: объект со всей информацией
   * делает:заполняет все данные о клиенте
   * создает,заполняет и привязывает вложенные модели
   */
  async fillClient(obj) {
    await this.fillPassport(obj.passport)
    await this.fillLivAddress(obj.livingAddress)
    await this.fillJobs(obj.jobs)
    await this.fillRegAddress(obj.regAddress)
    await this.fillChildren(obj.children)
  }


  /**
   * сдеалано просто для удобства,
   * чтобы можно было вызыват медоты из инстанса объкета
   */
  async updateChildren(children) {
    await Child.updateChildren(children, this)
  }

  async updateJobs(jobs) {
    await Job.updateJobs(jobs, this)
  }

  async fillPassport(passport, model) {
    if (passport) {
      await Passport.fillPassport(passport, model, this)
    }
  }

  async fillJobs(jobs) {
    if (jobs) {
      await Job.fillJobs(jobs, this)
    }
  }

  async fillRegAddress(address, model) {
    if (address) {
      await Address.fillAddress(address, this.regAddress(), model)
    }
  }

  async fillLivAddress(address, model) {
    if (address) {
      await Address.fillAddress(address, this.livingAddress(), model)
    }
  }

  async fillChildren(children) {
    if (children) {
      await Child.fillChildren(children, this)
    }
  }

  static getClientInfo(obj) {
    return this.getInfo(obj)
  }
}

module.exports = Client
