'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Address = use('App/Models/Address')
const type = Address.getType()

class AddressClientSchema extends Schema {
  up() {
    this.createExtensionIfNotExists('pgcrypto')

    this.create('address', (table) => {
      table.uuid('id')
        .primary()
        .unique()
        .defaultTo(this.db.raw('public.gen_random_uuid()'))
      table.string('country')
      table.string('zipCode')
      table.string('region')
      table.string('type')
      table.uuid('idOwner')
      table.string('city')
      table.string('street')
      table.string('house')
      table.string('block')
      table.string('apartment')
      table.timestamps()
    })
  }

  down() {
    this.drop('address')
  }
}

module.exports = AddressClientSchema
