import winston from 'winston';
import { Config } from '../config/index';

const Winston = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    defaultMeta: { /*application: 'API-EDU'*/ },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (parseInt(Config.debug)) {
    Winston.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

export { Winston }