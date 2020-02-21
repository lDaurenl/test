'use strict'
const Job = use('App/Models/Job')
const DeleteHook = exports = module.exports = {};

DeleteHook.client = async (client) => {
   client.children().delete();
   client.passport().delete();
  await client.regAddress().delete();
  await client.livingAddress().delete();
  let jobs = await client.jobs().fetch();
  for (let job of jobs['rows']) {
    await job.address().delete();
    await job.delete()
  }
};
DeleteHook.jobs = async (job) => {
  await job.address().delete();
};
