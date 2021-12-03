import { sequelize } from '../data-access/sequelize';

export class UserGroupService {

    private userGroupModel;

    constructor(userGroupModel: any) {
        this.userGroupModel = userGroupModel;
    }

    async addUsersToGroup(userId: number, groupsIds: any) {
        const groups = groupsIds.split(',');
        const t = await sequelize.transaction();
        try {
            for (const group of groups) {
                await this.userGroupModel.create({
                    userId: userId,
                    groupId: group
                }, { transaction: t });
            }
            await t.commit();
        } catch (error) {
            await t.rollback();
        }
        return true;
    }

}
