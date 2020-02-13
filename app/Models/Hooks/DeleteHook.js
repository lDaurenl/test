'use strict'
const Job = use('App/Models/Job')
const DeleteHook = exports = module.exports = {};

DeleteHook.client = async (client) => {
  await client.address().delete();
  await client.children().delete();
  await client.passport().delete();
  let jobs = await client.jobs().fetch();
  for (let job of jobs['rows']) {
    await job.address().delete();
    await job.delete()
  }
};
DeleteHook.jobs = async (job) => {
  await job.address().delete();
};
