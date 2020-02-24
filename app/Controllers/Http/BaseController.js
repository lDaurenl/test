const { validate } = use('Validator')
const Exception = use('App/Exceptions/ValidationException')

const RudRules = { id: 'required|UUID|existClient' }

class BaseHttpController {
  async validate(object,rules) {
    const validation = await validate(object, rules)
    if (validation.fails()) {
      throw new Exception(validation.messages(), 400)
    }
  }
}

module.exports = BaseHttpController
