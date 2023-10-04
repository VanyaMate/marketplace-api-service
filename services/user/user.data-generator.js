"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataGenerator = void 0;
var UserDataGenerator = /** @class */ (function () {
    function UserDataGenerator() {
        this.clearUser = {
            login: '',
            password: '',
            avatar: '',
        };
    }
    UserDataGenerator.prototype.avatar = function () {
        return undefined;
    };
    UserDataGenerator.prototype.byData = function (data) {
        return __assign(__assign({}, this.clearUser), data);
    };
    UserDataGenerator.prototype.clear = function () {
        return __assign({}, this.clearUser);
    };
    UserDataGenerator.prototype.filled = function (data) {
        return {
            login: this.login(),
            password: this.password(),
            avatar: this.avatar(),
        };
    };
    UserDataGenerator.prototype.login = function () {
        return undefined;
    };
    UserDataGenerator.prototype.password = function () {
        return undefined;
    };
    return UserDataGenerator;
}());
exports.UserDataGenerator = UserDataGenerator;
