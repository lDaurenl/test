'use strict'

const Schema = use('Schema')
const JobModel = use('App/Models/Job');
const TypesWork=JobModel.getTypesWork();

class JobsSchema extends Schema {
  up () {


    this.create('jobs', (table) => {
      this.createExtensionIfNotExists('uuid-ossp');

      table.uuid('id').unique().defaultTo(this.db.raw('public.gen_random_uuid()'));
      table.enu(TypesWork.Signature,TypesWork.ArrayTypes);
      table.date('dateEmp');
      table.date('dateDismissal');
      table.string('companyName');
      table.string('tin');
      table.uuid('idClient').references('id')
                                        .inTable('clients')
                                        .onDelete('cascade')
                                        .onUpdate('cascade');
      table.string('jobTitle');
      table.bigInteger('monIncome');
      table.string('fioManager');
      table.string('site');
      table.json('phoneNumbers');
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('jobs')
  }
}

module.exports = JobsSchema;
