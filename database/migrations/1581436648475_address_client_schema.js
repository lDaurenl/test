'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Address=use('App/Models/AddressClient');
const type=Address.getType();
class AddressClientSchema extends Schema {
  up () {
    this.create('addressClients', (table) => {
      table.uuid('id').primary();
      table.string('country');
      table.string('zipCode');
      table.string('region');
      table.enu(type.Signature,type.ArrayTypes);
      table.uuid('idClient').references().inTable('clients');
      table.string('city');
      table.string('street');
      table.string('house');
      table.string('block');
      table.string('apartment');
      table.timestamps()
    })
  }

  down () {
    this.drop('addressClients')
  }
}

module.exports = AddressClientSchema;
