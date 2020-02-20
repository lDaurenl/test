const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Validator = use('Validator')
  const Client = use('App/Models/Client')
  const Job = use('App/Models/Job')
  const Address = use('App/Models/Address')
  const Child = use('App/Models/Child')
  const Passport = use('App/Models/Passport')

  const addressRules = Address.getRulesValidate()
  const childRules = Child.getRulesValidate()
  const jobsRules = Job.getRulesValidate()
  const passportRules = Passport.getRulesValidate()
  const spouseRules = Client.getRulesValidateSpouse()

  const uuidReg = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

  const modelValidate = async (data, field, message, args, get, rules) => {
    const value = get(data, field)
    if (!value) {
      return
    }
    const validation = await Validator.validate(value, rules)
    if (validation.fails()) {
      throw message
    }
  }
  const UUIDv4 = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) {
      return
    }
    if(!await isUUIDv4(value)){
      throw message
    }
  }
  const isUUIDv4 = async (uuid) => {
    return uuidReg.test(uuid)
  }
  const enums = async (data, field, message, args, get, enums) => {
    const value = get(data, field)
    if (!value) {
      return
    }
    if (typeof enums
      .getType(value) != 'symbol') {
      throw message
    }
  }
  const status = async (data, field, message, args, get) => {
    const statuses = Client.getStatuses()
    return enums(data, field, message, args, get, statuses)
  }
  const typeEducation = async (data, field, message, args, get) => {
    const typesEducation = Client.getTypesEducation()
    return enums(data, field, message, args, get, typesEducation)
  }
  const maritalStatus = async (data, field, message, args, get) => {
    const maritalStatuses = Client.getMaritalStatuses()
    return enums(data, field, message, args, get, maritalStatuses)
  }
  const typeEmp = async (data, field, message, args, get) => {
    const typesEmp = Client.getTypesEmp()
    return enums(data, field, message, args, get, typesEmp)
  }
  const typeJob = async (data, field, message, args, get) => {
    const typeJob = Job.getTypesWork()
    return enums(data, field, message, args, get, typeJob)
  }
  const address = async (data, field, message, args, get) => {
    return modelValidate(data, field, message, args, get, addressRules)
  }

  const children = async (data, field, message, args, get) => {
    return modelsValidate(data, field, message, args, get, childRules)
  }
  const jobs = async (data, field, message, args, get) => {
    return modelsValidate(data, field, message, args, get, jobsRules)
  }
  const spouse = async (data, field, message, args, get) => {
    return modelValidate(data, field, message, args, get, spouseRules)
  }
  const modelsValidate = async (data, field, message, args, get, rules) => {
    const value = get(data, field)
    if (!value) {
      return
    }
    for (const model of value) {
      const validation = await Validator.validate(model, rules)
      if (validation.fails()) {
        throw message
      }
    }
  }
  const arrayUUID = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) {
      return
    }
    for (const uuid of value) {
      if (!await isUUIDv4(uuid)) {
        throw message
      }
    }
  }
  const existClient = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) {
      return
    }
    if(!Client.find(value)){
      throw message;
    }
  }
  const passport = async (data, field, message, args, get) => {
    return modelValidate(data, field, message, args, get, passportRules)
  }


  Validator.extend('status', status)
  Validator.extend('address', address)
  Validator.extend('children', children)
  Validator.extend('typeJob', typeJob)
  Validator.extend('jobs', jobs)
  Validator.extend('typeEducation', typeEducation)
  Validator.extend('maritalStatus', maritalStatus)
  Validator.extend('typeEmp', typeEmp)
  Validator.extend('arrayUUID', arrayUUID)
  Validator.extend('passport', passport)
  Validator.extend('spouse', spouse)
  Validator.extend('existClient',existClient)
  Validator.extend('UUID',UUIDv4)
})
