"use strict";

var _dotenv = require("dotenv");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _swaggerUiExpress = require("swagger-ui-express");

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _data = require("./data");

var _mappers = require("./mappers");

var _presentation = require("./presentation");

var _services = require("./services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var swaggerDocument = require("./swagger.json");
(0, _dotenv.config)();

(0, _data.initDB)(process.env.CONNECTION_STRING);

var app = (0, _express2.default)();
app.use((0, _cors2.default)({ origin: "*", credentials: true }));
app.use(_express2.default.json());

var clientRepository = new _data.MongooseClientRepository();
var clientService = new _services.ClientService(clientRepository, new _mappers.ClientMapper());
var router = (0, _presentation.clientController)(clientService);
router.use("/docs", _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(swaggerDocument));
app.use("/api", router);

app.listen(process.env.PORT || 80, function () {
    console.log("API running on %s", process.env.PORT);
});