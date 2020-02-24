'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChildrenSchema extends Schema {
  up() {
    this.createExtensionIfNotExists('uuid-ossp')

    this.create('children', (table) => {
      table.uuid('id')
        .primary()
        .unique()
        // .defaultTo(this.db.raw('public.gen_random_uuid()'))
      table.string('surname')
      table.string('name')
      table.string('patronymic')
      table.date('dob')
      table.uuid('idClient')
        .references('id')
        .inTable('clients')
        .onDelete('cascade')
        .onUpdate('cascade')
      table.timestamps()
    })
  }

  down() {
    this.dropIfExists('children')
  }
}

module.exports = ChildrenSchema
