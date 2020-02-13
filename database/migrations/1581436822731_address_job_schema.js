'use strict';

const Schema = use('Schema');

class AddressJobSchema extends Schema {
  up () {
    this.create('addressJobs', (table) => {
      table.uuid('id').primary();
      table.string('country');
      table.string('zipCode');
      table.string('region');
      table.uuid('idJob').references().inTable('Jobs');
      table.string('city');
      table.string('street');
      table.string('house');
      table.string('block');
      table.string('apartment');
      table.timestamps();
    })
  }

  down () {
    this.drop('addressJobs')
  }
}

module.exports = AddressJobSchema;
