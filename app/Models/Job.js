const Model = require('./InformagicModel')
const Address = use('App/Models/Address')
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

  static getInputProperties() {
    return [
      // 'id',
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

  static async fillJobs(jobs, client) {
    for (let jobObj of jobs) {
      this.fillJob(jobObj, client)
    }
  }

  static async fillJob(jobObj, client) {
    let jobInfo = Job.getJobInfo(jobObj)
    let job = await client.jobs()
      .create(jobInfo)
    if (jobObj.address) {
      await Address.fillAddress(job.address, job.address())
    }
    return job
  }

  static async updateJobs(jobs,client) {
    if (jobs) {
     await client.jobs()
        .delete()
     await client.fillJobs(jobs)
    }
  }

  static getRulesValidate() {
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
