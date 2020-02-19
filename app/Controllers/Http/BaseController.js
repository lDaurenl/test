'use strict'
const Exception = use('App/Exceptions/ValidationException')

const { validate } = use('Validator')


class BaseHttpController {
  async validate (request, rules) {
    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      throw new Exception(validation.messages(), 409)
    } else {
      return true
    }

  }
}

module.exports = BaseHttpController
