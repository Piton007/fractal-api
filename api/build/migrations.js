"use strict";

var _faker = require("faker");

var _faker2 = _interopRequireDefault(_faker);

var _dotenv = require("dotenv");

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();
(0, _data.initDB)(process.env.CONNECTION_STRING);
console.log("Run Migrations...");
var count = parseInt(process.argv.slice(2), 10);
async function dataSeeding() {
    for (var index = 0; index < count; index++) {
        await new _data.User({ firstName: _faker2.default.name.firstName(), lastName: _faker2.default.name.lastName(), email: _faker2.default.internet.email(), phone: _faker2.default.phone.phoneNumber() }).save();
    }
}

Promise.all([_data.User.deleteMany(), dataSeeding()]).then(function () {

    console.log("Migrations finished");
}).catch(console.log).finally(function () {
    _mongoose2.default.connection.close();
});