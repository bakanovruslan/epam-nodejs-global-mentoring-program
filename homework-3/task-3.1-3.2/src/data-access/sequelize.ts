import { Sequelize, STRING, NUMBER, BOOLEAN, QueryTypes } from "sequelize";
//TODO: to env
const sequelize = new Sequelize('postgres://Ruslan_Bakanov:pass@localhost:5432/homework-3');
export {sequelize, STRING, NUMBER, BOOLEAN, QueryTypes}