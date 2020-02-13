'use strict'

const Model = require('./InformagicModel');
const AddressModel = use('App/Models/AddressClient');
const PassportModel = use('App/Models/Passport');
const JobModel = use('App/Models/Job');
const ChildModel = use('App/Models/Child');
const Enum = require('./enum');

class Client extends Model {
  static _statuses = new Enum('status', ['lead', 'potential', 'notTarget',
    'consultation', 'application', 'deal', 'transactionParticipant', 'rejection']);
  static _typesEducation = new Enum('typeEducation', ['secondary',
    'secondarySpecial', 'incompleteHigher', 'higher', 'twoOrMoreHigher', 'academicDegree']);
  static _maritalStatuses = new Enum('maritalStatus', ['single', 'married',
    'widower/widow', 'inDivorce', 'civilMarriage']);
  static _typesEmp = new Enum('typeEmp', ['employee', 'iE',
    'owner/co-owner', 'retiree', 'unemployed']);

  static getKeyProperties() {
    return ['scope']
  }

  static getStatuses() {
    return this._statuses;
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
    super.boot();
    this.addHook('beforeDelete', 'DeleteHook.client')
  }

  passport() {
    return this.hasOne('App/Models/Passport', 'id', 'idClient');
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
    this.address().where('type', 'Reg')
  }

  livingAddress() {
    this.address().where('type', 'Liv')
  }

  address() {
    return this.hasMany('App/Models/AddressClient', 'id', 'idClient')
  }


  // getScope() {
  //   return JSON.parse(this.scope);
  // }
  //
  // setScope(scope) {
  //   this.scope = JSON.stringify(scope);
  // }

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
    return JSON.parse(files);
  }

  setFiles(files) {
    return JSON.stringify(files)
  }

  static async createClient(clientObj) {
    if (await this.IsExistObject(clientObj, Client)) {
      return null
    }
    let client = new Client();
    for (let property of this.getInputProperties()) {
      client[property] = clientObj[property];
    }
    await client.save();
    return this.createOrUpdateClient(clientObj, client)
  }

  static async Update(client, clientObj) {
    if (clientObj.children !== undefined) {
     await client.children().delete()
    }
    if(clientObj.jobs!==undefined){
      await client.jobs().delete()
    }

  }

  static async createOrUpdateClient(Obj, client) {
    let passportObj = Obj.passport;
    passportObj.scope = Obj.scope;
    let passport = await PassportModel.createPassport(PassportModel);
    if (passport == null) {
      client.delete();
      return null;
    }
    await AddressModel.createAddress(Obj.regAddress, 'Reg', client.id);
    await AddressModel.createAddress(Obj.livingAddress, 'Liv', client.id);
    await JobModel.createJobs(Obj.jobs, client.id);
    await ChildModel.createChildren(Obj.children, client.id);
    passport.idClient = client.id;
    await passport.save();
    return client;
  }
}//допилить id
module.exports = Client;
