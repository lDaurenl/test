'use strict';
const Model = require('./InformagicModel');
const Enum = require('./enum');
const Address = use('App/Models/AddressJob');

class Job extends Model {
  static _typesWork = new Enum('type', ['main', 'pluralistically', 'owner / participant']);

  static boot() {
    super.boot();
    this.addHook('beforeDelete', 'DeleteHook.jobs')
  }

  setPhoneNumbers(phoneNumbers) {
    return JSON.stringify(phoneNumbers);
  }

  getPhoneNumbers(phoneNumbers) {
    return JSON.parse(phoneNumbers);
  }

  address() {
    return this.hasOne('App/Models/AddressJob', 'id', 'idJob');
  }

  static getInputProperties() {
    return ['id',
      'dateEmp',
      'dateDismissal',
      'companyName',
      'tin',
      'type',
      'jobTitle',
      'monIncome',
      'fioManager',
      'phoneNumbers',
      'site']
  }

  static getKeyProperties() {
    return ['id']
  }

  static getTypesWork() {
    return this._typesWork
  }

  static async createJobs(jobs, idClient) {
    for (let job of jobs) {
      await this.createJob(job, idClient)
    }
  }

  static async createJob(jobObj, idClient) {
    let job = new Job();
    let addressObj = jobObj.address;
    let address = await Address.createAddress(addressObj);
    if (await this.IsExistObject(jobObj, Job)) {
      return null
    }
    for (let property of this.getInputProperties()) {
      job[property] = jobObj[property];
    }
    job.idClient = idClient;
    await job.save();
    address.idJob = job.id;
    await address.save();
    return job;
  }
}

module.exports = Job;
