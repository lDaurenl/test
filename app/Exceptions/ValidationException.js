'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ValidationException extends LogicalException {
  handle(error,{response}){
    const validation=error.message
    response.status(error.status).send(validation)
  }
}

module.exports = ValidationException
