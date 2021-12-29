import { sequelize, NUMBER } from '../data-access/sequelize';

export const UserGroups = sequelize.define('user_group', {
    userId: {
        type: NUMBER,
        field: 'user_id'
    },
    groupId: {
        type: NUMBER,
        field: 'group_id'
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});
//disable primary key (id by defaut)
UserGroups.removeAttribute('id');