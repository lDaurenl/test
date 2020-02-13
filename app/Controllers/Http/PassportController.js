'use strict';

const PassportModel = use('App/Models/Passport');

class PassportController {
  async index({response}) {
    response.send(await PassportModel.all());
  }

  async store({request, response}) {
    let passportObj = JSON.parse(request.input('passport'));
    let passport = await PassportModel.createPassport(passportObj);
    if (passport == null) {
      return response.status(400).send('уже существует обьект модели с индентичными' +
        `ключевыми полями:${PassportModel.getKeyProperties()}`);
    }
   await passport.save();
    response.send(passport);
  }
}

module.exports = PassportController;
