"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClientService = exports.ClientService = function () {
  function ClientService(repository, mapper) {
    _classCallCheck(this, ClientService);

    this._repository = repository;
    this._mapper = mapper;
  }

  _createClass(ClientService, [{
    key: "getAll",
    value: async function getAll() {
      return (await this._repository.findAll()).map(this._mapper.fromModelToDTO);
    }
  }, {
    key: "add",
    value: async function add(user) {
      return await this._repository.create(user);
    }
  }, {
    key: "update",
    value: async function update(id, data) {
      return this._mapper.fromModelToDTO((await this._repository.updateById(id, data)));
    }
  }]);

  return ClientService;
}();