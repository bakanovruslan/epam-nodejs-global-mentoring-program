import { sequelize, NUMBER, STRING, BOOLEAN } from '../data-access/sequelize';

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