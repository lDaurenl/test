'use strict';

class Enum {
  constructor(signature, arrayTypes) {
    this._arrayTypes = arrayTypes;
    this._map = new Map();
    this._signature = signature;
    for (let val of arrayTypes)
      this._map.set(val, Symbol(val))
  }

  getType(name) {
    return this._map.get(name)
  }

  get Signature() {
    return this._signature
  }

  get ArrayTypes() {
    return this._arrayTypes
  }
}

module.exports = Enum;

