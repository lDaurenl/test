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

  /**
   * принимает:массив с подготовленной информацией для создания
   * инстанса модели и клиента(инстанс модели) куда будут привязаны работы
   * делает:создает и привязывает работы к клиенту
   */
  static async fillJobs(jobs, client) {
    for (let jobObj of jobs) {
      await this.fillJob(jobObj, client)
    }
  }

  /**
   * принимает:обьект с информацией о работе
   * и инстанс модели клиента
   * делает:создает инстанс модели работы
   * с заполненной информацией
   */
  static async fillJob(jobObj, client) {
    let jobInfo = Job.getJobInfo(jobObj)
    let job = await client.jobs()
      .create(jobInfo)
    if (jobObj.address) {
      await Address.fillAddress(jobObj.address, job.address())
    }
    return job
  }

  /**
   * принимает:массив обьектов с  информацией для создания
   * инстанса модели и клиента куда будут привязаны работы
   * делает:удаляет старые работы,создает и  привязывает новые
   */
  static async updateJobs(jobs, client) {
    if (jobs) {
      await client.jobs()
        .delete()
    }
    await client.fillJobs(jobs)
  }
}

module.exports = Job
