'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * JobsTransformer class
 *
 * @class JobsTransformer
 * @constructor
 */
class JobsTransformer extends BumblebeeTransformer {
  static get defaultInclude() {
    return [
      'address'
    ]
  }

  transform(model) {
    return {
      dateEmp: model.dateEmp,
      dateDismissal: model.dateDismissal,
      companyName: model.companyName,
      tin: model.tin,
      type: model.type,
      jobTitle: model.jobTitle,
      monIncome: model.monIncome,
      fioManager: model.fioManager,
      site: model.site
    }
  }

  includeAddress(job) {
    return this.item(job.getRelated('address'), 'AddressTransformer')
  }
}

module.exports = JobsTransformer
