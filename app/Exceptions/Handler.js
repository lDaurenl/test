'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const ValidationException = use('App/Exceptions/ValidationException')
const ServerException = use('App/Exceptions/ServerException')

class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { request, response }) {
    if (error.name === 'ValidationException') {
      ValidationException.ExceptionToResponse(error, response)
    } else {
      ServerException.ExceptionToResponse(error, response)
    }
  }
  async report(error, { request }) {
  }
}

module.exports = ExceptionHandler
