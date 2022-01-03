import {Config} from '../config/index';
import { Sequelize, STRING, NUMBER, BOOLEAN, QueryTypes, ENUM } from "sequelize";
const sequelize = new Sequelize(
    Config.dbSystem + '://' + Config.dbUser + ':' + Config.dbPass + '@' + Config.dbHost + ':' + Config.dbPort + '/' + Config.dbName
);
export {sequelize, STRING, NUMBER, BOOLEAN, QueryTypes, ENUM}