Rules = {
  Client: {
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
    communications: 'arrayUUID',
    spouse: 'client'
  },

  Address: {
    zipCode: 'string',
    region: 'string',
    city: 'string',
    street: 'string',
    house: 'string',
    block: 'string',
    apartment: 'string'
  },

  Child: {
    surname: 'string',
    name: 'string',
    patronymic: 'string',
    dob: 'date'
  },
  Job: {
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

  },
  Passport() {
    return {
      series: 'string',
      number: 'string',
      giver: 'string',
      dateIssued: 'date',
      birthPlace: 'string'
    }
  }
}
module .exports=Rules
