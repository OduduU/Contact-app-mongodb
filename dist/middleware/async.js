"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function asyncMiddleware(handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        }
        catch (ex) {
            next(ex);
        }
    };
}
exports.asyncMiddleware = asyncMiddleware;
//# sourceMappingURL=async.js.map