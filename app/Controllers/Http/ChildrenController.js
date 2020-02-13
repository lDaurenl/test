'use strict';
const ChildModel = use('App/Models/Child');

class ChildrenController {
  async index({response}) {
    response.send(await ChildModel.all());
  }

  async store({request, response}) {
    let children = JSON.parse(request.input('children'));
    await ChildModel.createChildren(children);
    response.redirect('/children', false, 302);
  }
}

module.exports = ChildrenController;
