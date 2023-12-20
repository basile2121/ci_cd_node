const { format, createLogger, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
const APINAME = 'Civilisation API';

export const logger = createLogger({
    format: combine(
        label({ label: APINAME }),
        timestamp({
            format: 'YYYY-MMM-DD HH:mm:ss',
        }),
        prettyPrint()
    ),
    transports: [
        new transports.File({
            level: 'error',
            filename: './logs/error.log',
        }),
        new transports.File({
            level: 'info',
            filename: './logs/info.log',
        }),

        new transports.Console(),
    ],
});