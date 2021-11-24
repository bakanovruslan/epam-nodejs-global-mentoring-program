import dotenv from 'dotenv';

dotenv.config();

export const Config = {
    debug: process.env.DEBUG,
    port: process.env.PORT,
    appListenPhrase: 'App listening at http://localhost'
}
