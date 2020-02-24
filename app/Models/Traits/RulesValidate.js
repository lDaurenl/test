'use strict'
 const Rules=require('../ModelsRulesValidate')
class RulesValidate {
  register (Model, customOptions = {}) {
    const defaultOptions = {}
    Model.getRulesValidate=()=>{return Rules[Model.name]}
  }
}

module.exports = RulesValidate
