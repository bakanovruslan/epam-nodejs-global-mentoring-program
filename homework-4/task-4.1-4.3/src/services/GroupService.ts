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