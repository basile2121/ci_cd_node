"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.jwt || null;
    const secret = process.env.TOKEN_SECRET;
    if (token && secret) {
        jsonwebtoken_1.default.verify(token, secret, (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.locals.user = null;
                res.cookie("jwt", "", { maxAge: 1 });
                return res.status(403).json({ error: "Bad token" });
            }
            const user = yield user_model_1.User.findById(decodedToken.id);
            res.locals.user = user;
            if (!res.locals.user) {
                res.cookie("jwt", "", { maxAge: 1 });
                return res.status(403).json({ error: "User doesn't exist" });
            }
            next();
        }));
    }
    else {
        res.locals.user = null;
        return res.status(403).json({ error: "Not authorized" });
    }
});
exports.checkAuth = checkAuth;
