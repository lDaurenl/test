'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ServerException extends LogicalException {
static ExceptionToResponse({status,message,code,name,stack},response){
  const EServer={
    code:status,
    key:code||name,
    stack:stack,
    message:message
  }
  response.status(status).send(EServer)
}
}

module.exports = ServerException
