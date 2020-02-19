'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * AddressTransformer class
 *
 * @class AddressTransformer
 * @constructor
 */
class AddressTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return {
      country: model.country,
      zipCode: model.zipCode,
      region: model.region,
      city: model.city,
      street: model.street,
      house: model.house,
      block: model.block,
      apartment: model.apartment
    }
  }
}

module.exports = AddressTransformer
