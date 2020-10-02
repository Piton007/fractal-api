"use strict";

var _dotenv = require("dotenv");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _data = require("./data");

var _mappers = require("./mappers");

var _presentation = require("./presentation");

var _services = require("./services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();

(0, _data.initDB)(process.env.CONNECTION_STRING);

var app = (0, _express2.default)();
app.use((0, _cors2.default)({ origin: "*", credentials: true }));
app.use(_express2.default.json());

var clientRepository = new _data.MongooseClientRepository();
var clientService = new _services.ClientService(clientRepository, new _mappers.ClientMapper());
var controller = (0, _presentation.clientController)(clientService);
app.use(controller);

app.listen(process.env.PORT || 80, function () {
    console.log("API running on %s", process.env.PORT);
});