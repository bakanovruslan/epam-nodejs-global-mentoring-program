import winston from 'winston';

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

Winston.add(new winston.transports.Console({
    format: winston.format.simple(),
}));

export {Winston}