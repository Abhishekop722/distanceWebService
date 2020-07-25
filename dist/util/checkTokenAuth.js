"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("../config/settings");
let jwt = require('jsonwebtoken');
const APP_SECRET = process.env.APP_SECRET;
const excludeAPis = ['/loginWithPassword'];
exports.default = (req, res, next) => {
    let errorResp = Object.assign({}, settings_1.errorObj, { message: 'Token is not valid' });
    if (excludeAPis.some((path) => {
        let temp = RegExp(path);
        return temp.test(req.path);
    }))
        return next();
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        jwt.verify(token, APP_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json(errorResp);
            }
            req.user = user;
            const userCtrl = require('../../controllers/user');
            userCtrl.default.isuserExist(user._id)
                .then((doc) => {
                if (doc) {
                    next();
                }
                else {
                    res.status(401).json(errorResp);
                }
            })
                .catch((err) => {
                return res.status(401).json(errorResp);
            });
        });
    }
    else {
        return res.status(401).json(errorResp);
    }
};
//# sourceMappingURL=checkTokenAuth.js.map