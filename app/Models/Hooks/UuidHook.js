'use strict'
const uuidv4 = require("uuid/v4");
const UuidHook = (exports = module.exports = {});

UuidHook.uuid= async (modelInstance) => {
  modelInstance.id=uuidv4()
}
