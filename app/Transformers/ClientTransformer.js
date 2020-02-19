'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const AddressTransformer = use('App/Transformers/AddressTransformer')


/**
 * ClientTransformer class
 *
 * @class ClientTransformer
 * @constructor
 */
class ClientTransformer extends BumblebeeTransformer {
  static get defaultInclude () {
    return [
      'regAddress',
      'livingAddress',
      'passport',
      'children',
      'jobs'
    ]
  }

  async transform(model) {
    return {
      id: model.id,
      surname: model.surname,
      name: model.name,
      patronymic: model.patronymic,
      nameChange: model.nameChange,
      dob: model.dob,
      birthCountry: model.birthCountry,
      citizenship: model.citizenship,
      snils: model.snils,
      tin: model.tin,
      status: model.status,
      typeEducation: model.typeEducation,
      maritalStatus: model.maritalStatus,
      generalExp: model.generalExp,
      curWorkExp: model.curWorkExp,
      curFieldExp: model.curFieldExp,
      typeEmp: model.typeEmp,
      monIncome: model.monIncome,
      monExpenses: model.monExpenses,
      files: model.files,
      documents: model.documents,
      communications: model.communications
    }
  }
  async transformWithSpouse(model){
    return {
      ...this.transform(model),
      spouse: await this.transform(await model.spouse().load())
    }
  }
  includeRegAddress (client) {
    return this.item(client.getRelated('regAddress'),'AddressTransformer')
  }
  includeLivingAddress (client) {
    return this.item(client.getRelated('livingAddress'),'AddressTransformer')
  }
  includePassport (client) {
    return this.item(client.getRelated('passport'),'PassportTransformer')
  }
  includeChildren(client){
    return this.collection(client.getRelated('children'),'ChildrenTransformer')
  }
  includeJobs(client){
    return this.collection(client.getRelated('jobs'),'JobsTransformer')
  }
}

module.exports = ClientTransformer
