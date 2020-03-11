const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Validator = use('Validator')
  const Client = use('Clients/Models/Client')
  const Job = use('Clients/Models/Job')
  const Address = use('Clients/Models/Address')
  const Child = use('Clients/Models/Child')
  const Passport = use('Clients/Models/Passport')

  const addressRules = Address.getRulesValidate()
  const childRules = Child.getRulesValidate()
  const jobsRules = Job.getRulesValidate()
  const passportRules = Passport.getRulesValidate()
  const clientRules = Client.getRulesValidate()

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
    if (!await isUUIDv4(value)) {
      throw message
    }
  }
  const isUUIDv4 = async (uuid) => {
    return uuidReg.test(uuid)
  }
  const IsPhone = async (phone) => {
    const regExp = /^\+?\d+$/
    return regExp.test(phone)
  }
  const IsEmail = async (email) => {
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regExp.test(String(email)
      .toLowerCase())
  }
  const communications = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) {
      return
    }
    for (const communication in communications) {
      if (communication.type == 'email' && await IsEmail(communication.value) ||
        communication.type == 'phone' && await IsPhone(communication.value)) {
        continue
      } else {
        throw message
      }
    }
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
  const client = async (data, field, message, args, get) => {
    return modelValidate(data, field, message, args, get, clientRules)
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
    if (!await Client.find(value)) {
      throw message
    }
  }
  const passport = async (data, field, message, args, get) => {
    return modelValidate(data, field, message, args, get, passportRules)
  }
  const sortDir=async (data, field, message, args, get)=>{
    const value = get(data, field)
    if(value!='desc'&&value!='asc'&&value!=null)
      throw message
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
  Validator.extend('client', client)
  Validator.extend('existClient', existClient)
  Validator.extend('UUID', UUIDv4)
  Validator.extend('communications',communications)
  Validator.extend('sortDir',sortDir)
})
