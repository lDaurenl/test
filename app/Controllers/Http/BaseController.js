const { validate } = use('Validator')
const Exception = use('App/Exceptions/ValidationException')


class BaseHttpController {
  async validate(object, rules=this.getRudRules()) {
    const validation = await validate(object, rules)
    if (validation.fails()) {
      throw new Exception(validation.messages(), 400)
    }
  }

  getRudRules() {
    return { id: 'required|UUID' }
  }

  getIndexRules() {
    return {
      sortBy: 'string',
      sortDir: 'sortDir',
      page: 'number',
      limit: 'number'
    }
  }
}

module.exports = BaseHttpController
