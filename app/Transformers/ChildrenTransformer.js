'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * ChildrenTransformer class
 *
 * @class ChildrenTransformer
 * @constructor
 */
class ChildrenTransformer extends BumblebeeTransformer {
  transform(model) {
    return {
      surname: model.surname,
      name: model.name,
      patronymic: model.patronymic,
      dob: model.dob
    }
  }
}

module.exports = ChildrenTransformer
