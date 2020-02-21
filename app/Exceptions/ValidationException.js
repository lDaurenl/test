'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ValidationException extends LogicalException {
 static ExceptionToResponse({status,message},response){
    const EValidation={
      code:status,
      key:'E_VALIDATION_FAILED',
      message:message
    }
    response.status(status).send(EValidation)
  }
}
module.exports = ValidationException
