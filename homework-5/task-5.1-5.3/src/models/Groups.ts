import { sequelize, NUMBER, STRING, ENUM} from '../data-access/sequelize';

export const Groups = sequelize.define('groups', {
    id: {
        primaryKey: true,
        type: NUMBER,
        field: 'id'
    },
    name: {
        type: STRING,
        field: 'name'
    },
    permissions: {
        type: ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES') ,
        field: 'permissions'
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});