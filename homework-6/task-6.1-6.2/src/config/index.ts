import dotenv from 'dotenv';

dotenv.config();

export const Config = {
    debug: process.env.DEBUG!,
    port: process.env.PORT,
    tokenKey: process.env.TOKEN_KEY,
    tokenExpired: process.env.TOKEN_EXPIRED_AFTER,
    appListenPhrase: 'App listening at http://localhost'
}
