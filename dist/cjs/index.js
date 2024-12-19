"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return resolveOnceMap;
    }
});
require("./polyfills.js");
var _resolveonce = /*#__PURE__*/ _interop_require_default(require("resolve-once"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function resolveOnceMap(fn) {
    var resolvers = {};
    return function(key) {
        var resolver = resolvers[key];
        if (!resolver) {
            resolver = (0, _resolveonce.default)(function() {
                try {
                    return fn(key);
                } catch (err) {
                    return Promise.reject(err);
                }
            });
            resolvers[key] = resolver;
        }
        return resolver();
    };
}
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }