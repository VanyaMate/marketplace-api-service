"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
var StorageService = /** @class */ (function () {
    function StorageService(_storage, _storageName) {
        this._storage = _storage;
        this._storageName = _storageName;
    }
    StorageService.prototype.get = function () {
        var result = this._storage.getItem(this._storageName);
        return result ? JSON.parse(result) : [];
    };
    StorageService.prototype.set = function (items) {
        this._storage.setItem(this._storageName, JSON.stringify(items));
    };
    return StorageService;
}());
exports.StorageService = StorageService;
