'use strict';

const JobModel = use('App/Models/Job');

class JobController {
  async index({response}) {
    response.send(await JobModel.all());
  }

  async store({request, response}) {
    let jobObj = JSON.parse(request.input('job'));
    let job = await JobModel.createJob(jobObj);
    if (job == null) {
      return response.status(400).send('уже существует обьект модели с индентичными' +
        `ключевыми полями:${JobModel.getKeyProperties()}`);
    }
    response.send(job);
  }
}

module.exports = JobController;
