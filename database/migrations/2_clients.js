'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const ClientModel = use('App/Models/Client')

const Statuses = ClientModel.getStatuses()
const TypesEducation = ClientModel.getTypesEducation()
const MaritalStatuses = ClientModel.getMaritalStatuses()
const TypesEmp = ClientModel.getTypesEmp()


class ClientsSchema extends Schema {
  up() {
    this.create('clients', (table) => {
      this.createExtensionIfNotExists('uuid-ossp');

      table.uuid('id')
        .primary().unique().defaultTo(this.db.raw('public.gen_random_uuid()'))
      table.enu(Statuses.Signature, Statuses.ArrayTypes)
      table.string('surname')
      table.string('name')
      table.string('patronymic')
      table.boolean('nameChange')
      table.date('dob')
      table.string('birthCountry')
      table.string('citizenship')
      table.string('snils')
      table.string('tin')
      table.enu(TypesEducation.Signature, TypesEducation.ArrayTypes)
      table.enu(MaritalStatuses.Signature, MaritalStatuses.ArrayTypes)
      table.uuid('spouse')
        .references('id')
        .inTable('clients')
        .onDelete('cascade')
        .onUpdate('cascade')
      table.json('communications')
      table.float('generalExp')
      table.float('curWorkExp')
      table.float('curFieldExp')
      table.enu(TypesEmp.Signature, TypesEmp.ArrayTypes)
      table.bigInteger('monIncome')
      table.bigInteger('monExpenses')
      table.json('files')
      table.json('documents')
      table.timestamps()
    })
  }

  down() {
    this.dropIfExists('clients')
  }
}

module.exports = ClientsSchema
