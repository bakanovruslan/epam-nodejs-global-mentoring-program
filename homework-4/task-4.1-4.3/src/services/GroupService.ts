// import { QueryTypes, sequelize } from '../data-access/sequelize';
// import { User } from '../types/User';
class GroupService {

    private groupModel;

    constructor(groupModel: any) {
        this.groupModel = groupModel;
    }

    async createGroup(user: Group) {
        let result = await this.groupModel.create(user);
        return result.toJSON();
    }

    async updateGroup(groupId: string, data: object) {
        await this.groupModel.update(data, { where: { id: groupId } });
        return await this.groupModel.findByPk(groupId);
    }

    // async getAutoSuggestedUsers(loginSubstring: string, sqlLimit: number) {
    //     let listQuery = "SELECT id, login, password, age, is_deleted FROM users WHERE login LIKE '%" + loginSubstring + "%' ORDER BY login ASC LIMIT " + sqlLimit;
    //     return await sequelize.query(listQuery, { type: QueryTypes.SELECT });
    // }

    async getGroup(groupId: number) {
        return await this.groupModel.findByPk(groupId);
    }

    async getAllGroups() {
        return await this.groupModel.findAll();
    }

    async removeGroup(groupId: number) {
        return await this.groupModel.destroy({ where: { id: groupId } });
    }



}
export { GroupService };