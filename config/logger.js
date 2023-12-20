"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label, printf, prettyPrint } = format;
const APINAME = "Civilisation API";
exports.logger = createLogger({
    format: combine(label({ label: APINAME }), timestamp({
        format: "YYYY-MMM-DD HH:mm:ss",
    }), prettyPrint()),
    transports: [
        new transports.File({
            level: "error",
            filename: "./logs/error.log",
        }),
        new transports.File({
            level: "info",
            filename: "./logs/info.log",
        }),
        new transports.Console(),
    ],
});
