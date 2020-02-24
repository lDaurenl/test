'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const ValidationException = use('App/Exceptions/ValidationException')
const ServerException = use('App/Exceptions/ServerException')

class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { request, response }) {
    if (error.name === 'ValidationException') {
      ValidationException.ExceptionToResponse(error, response)
    } else {
      ServerException.ExceptionToResponse(error, response)
    }
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {
  }
}

module.exports = ExceptionHandler
