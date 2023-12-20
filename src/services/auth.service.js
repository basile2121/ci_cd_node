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
exports.createToken = exports.login = exports.register = exports.findOne = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const findOne = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne(data);
    if (!user) {
        throw Error("User not found");
    }
    return user;
});
exports.findOne = findOne;
const register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findOne({ email: data.email });
        if (user) {
            return new Error("Email already exists");
        }
        const newUser = new user_model_1.User(data);
        return newUser.save();
    }
    catch (e) {
        return e;
    }
});
exports.register = register;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield loginCompare(email, password);
        if (!user) {
            return new Error("Incorrect credentials");
        }
        return user;
    }
    catch (e) {
        return e;
    }
});
exports.login = login;
const createToken = (id) => {
    const secret = process.env.TOKEN_SECRET;
    const maxAge = 3 * 24 * 60 * 60 * 1000;
    if (secret) {
        return jsonwebtoken_1.default.sign({ id }, secret, {
            expiresIn: maxAge
        });
    }
};
exports.createToken = createToken;
const loginCompare = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.User.findOne({ email });
        if (user) {
            const auth = yield bcrypt_1.default.compare(password, user.password);
            if (auth) {
                user.password = undefined;
                return user;
            }
            return new Error("incorrect password");
        }
        return new Error("incorrect email");
    });
};
