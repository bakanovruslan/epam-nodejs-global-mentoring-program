import { Sequelize, STRING, NUMBER, BOOLEAN, QueryTypes } from "sequelize";

const sequelize = new Sequelize('postgres://Ruslan_Bakanov:pass@localhost:5432/homework-3');

export const Users = sequelize.define('users', {
    id: {
        primaryKey: true,
        type: NUMBER,
        field: 'id'
    },
    login: {
        type: STRING,
        field: 'login'
    },
    password: {
        type: STRING,
        field: 'password'
    },
    age: {
        type: NUMBER,
        field: 'age'
    },
    isDeleted: {
        type: BOOLEAN,
        field: 'is_deleted'
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});