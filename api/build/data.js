"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MongooseClientRepository = exports.User = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.initDB = initDB;

var _mongoose = require("mongoose");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var clientSchema = new _mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String
});

var User = exports.User = (0, _mongoose.model)('client', clientSchema);

var MongooseClientRepository = exports.MongooseClientRepository = function () {
    function MongooseClientRepository() {
        _classCallCheck(this, MongooseClientRepository);
    }

    _createClass(MongooseClientRepository, [{
        key: "findAll",
        value: async function findAll(startIndex, endIndex) {
            return await User.find().skip(startIndex).limit(endIndex);
        }
    }, {
        key: "getTotal",
        value: async function getTotal() {
            return await User.countDocuments();
        }
    }, {
        key: "create",
        value: async function create(_ref) {
            var firstName = _ref.firstName,
                lastName = _ref.lastName,
                email = _ref.email,
                phone = _ref.phone;

            var user = new User({ firstName: firstName, lastName: lastName, email: email, phone: phone });
            return await user.save();
        }
    }, {
        key: "updateById",
        value: async function updateById(id, user) {
            return await User.findByIdAndUpdate.apply(User, [id].concat(_toConsumableArray(user)));
        }
    }]);

    return MongooseClientRepository;
}();

function initDB(uri) {
    (0, _mongoose.connect)(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(function () {
        console.log("DB Connected");
    }).catch(function (err) {
        console.log(err);
        os.exit(1);
    });
}