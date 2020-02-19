'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PassportsSchema extends Schema {
  up () {

    this.create('passports', (table) => {
      table.uuid('id').primary();
      table.string('series');
      table.string('number');
      table.string('giver');
      table.date('dateIssued');
      table.uuid('idClient').references('id').inTable('clients').onDelete('cascade').onUpdate('cascade');
      table.string('birthPlace')
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('passports')
  }
}

module.exports = PassportsSchema
