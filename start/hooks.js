const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Validator = use('Validator')
  const Exception = use('App/Exceptions/ValidationException')
  const Client = use('App/Models/Client')
  const Job=use('App/Models/Job')
  const Address=use('App/Models/Address')
  const Child=use('App/Models/Child')

  const addressRules = Address.getRulesValidate();
  const childRules = Child.getRulesValidate()
  const jobsRules = Job.getRulesValidate()

  const modelValidate = async (data, field, message, args, get,rules) => {
    const value = get(data, field)
    if (!value) {
      return
    }
    const validation = await Validator.validate(value,rules)
    if (validation.fails()) {
      throw message
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
    const typesEducation = Client.getTypesEmp()
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
    const typeJob =Job.getTypesWork();
    return enums(data, field, message, args, get, typeJob)
  }
  const address = async (data, field, message, args, get) => {
  return modelValidate(data, field, message, args, get,addressRules)
    }

  const children = async (data, field, message, args, get) => {
    return modelsValidate(data, field, message, args, get,childRules)
  }
  const jobs = async (data, field, message, args, get) => {
    return modelsValidate(data, field, message, args, get,jobsRules)
  }
  const modelsValidate = async (data, field, message, args, get,rules) => {
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


  Validator.extend('status', status)
  Validator.extend('address', address)
  Validator.extend('children', children)
  Validator.extend('typeJob', typeJob)
  Validator.extend('jobs', jobs)
  Validator.extend('typeEducation',typeEducation)
  Validator.extend('maritalStatus',maritalStatus)
  Validator.extend('typeEmp',typeEmp)
})
