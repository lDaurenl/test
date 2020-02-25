'use strict';

const JobModel = use('App/Models/Job');

class JobController {
  async index({transform}) {
    return transform.collection(await JobModel.all(),'JobsTransformer')
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
