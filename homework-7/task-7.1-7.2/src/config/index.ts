import dotenv from 'dotenv';
dotenv.config();

export const Config = {
    debug: process.env.DEBUG!,
    port: process.env.PORT,

    tokenKey: process.env.TOKEN_KEY,
    tokenExpired: process.env.TOKEN_EXPIRED_AFTER,

    unauthorizedActions: ['/login'],
    tokenTitle: 'x-access-token',
    unauthorizedTitle: 'Unauthorized',
    forbiddenTitle: 'Forbidden',

    appListenPhrase: 'App listening at http://localhost',

    dbSystem: process.env.DB_MS,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME,
}
