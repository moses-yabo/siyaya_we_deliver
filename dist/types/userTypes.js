"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Business_options = exports.User_roles = void 0;
var User_roles;
(function (User_roles) {
    User_roles["ADMIN"] = "ADMIN";
    User_roles["DRIVER"] = "DRIVER";
    User_roles["PASSENGER"] = "PASSENGER";
    User_roles["TAXI_OWNER"] = "TAXI_OWNER";
    User_roles["TRAILER_RENTAL"] = "TRAILER_RENTAL";
    User_roles["USER"] = "USER";
})(User_roles || (exports.User_roles = User_roles = {}));
var Business_options;
(function (Business_options) {
    Business_options["STAFF"] = "STAFF_TRANSPORT";
    Business_options["SCHOOL_DRIVER"] = "DRIVER";
    Business_options["CASUAL"] = "CASUAL";
    Business_options["TRANSPORT_GOODS"] = "TRANSPORT_GOODS";
})(Business_options || (exports.Business_options = Business_options = {}));
