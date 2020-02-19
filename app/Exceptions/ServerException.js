'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ServerException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = ServerException
