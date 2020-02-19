'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * PassportTransformer class
 *
 * @class PassportTransformer
 * @constructor
 */
class PassportTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return {
      series: model.series,
      number: model.number,
      giver: model.giver,
      dateIssued: model.dateIssued,
      birthPlace: model.birthPlace
    }
  }
}

module.exports = PassportTransformer
