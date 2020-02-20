'use strict'

const SpouseTransformer = use('App/Transformers/SpouseTransformer')


/**
 * ClientTransformer class
 *
 * @class ClientTransformer
 * @constructor
 */
class ClientTransformer extends SpouseTransformer {
  static get defaultInclude() {
    return [
      'spouse'
    ]
  }

  async transform(model) {
    return super.transform(model)
  }

  includeSpouse(client) {
    return this.item(client.getRelated('spouse'), 'SpouseTransformer')
  }
}

module.exports = ClientTransformer
