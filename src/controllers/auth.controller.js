"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whoami = exports.logout = exports.login = exports.register = void 0;
const authService = __importStar(require("../services/auth.service"));
const logger_1 = require("../../config/logger");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield authService.register(req.body);
        if (data instanceof Error) {
            logger_1.logger.error('Controller -> register : Error while register. Schema not validate : ' + data);
            return res.status(400).json({ error: data.message });
        }
        logger_1.logger.info('Controller -> register : Register success');
        return res.status(201).json({ data });
    }
    catch (e) {
        logger_1.logger.error('Controller -> register : Error while register : ' + e);
        return res.status(400).json({ error: e });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const maxAge = 3 * 24 * 60 * 60 * 1000;
    const data = yield authService.login(email, password);
    if (data instanceof Error) {
        logger_1.logger.error('Controller -> login : Error while login. Schema not validate : ' + data);
        return res.status(400).json({ error: data.message });
    }
    const token = authService.createToken(data._id);
    if (token) {
        res.cookie('jwt', token, { httpOnly: true, maxAge });
    }
    logger_1.logger.info('Controller -> login : Login : ' + email + ' success');
    return res.status(200).json({ user: data, token: token });
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("jwt", "", { maxAge: 1 });
    logger_1.logger.info('Controller -> logout : Your are now logged out');
    return res.status(200).json({ message: "Your are now logged out" });
});
exports.logout = logout;
const whoami = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    user.password = undefined;
    if (!user) {
        logger_1.logger.error('Controller -> whoami : No user found');
        return res.status(403).json({ error: "No user found" });
    }
    logger_1.logger.info('Controller -> whoami : Whoami : ' + user.email + ' success');
    return res.status(200).json({ user });
});
exports.whoami = whoami;
