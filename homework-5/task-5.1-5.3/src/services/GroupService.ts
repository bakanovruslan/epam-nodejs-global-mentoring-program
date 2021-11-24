import { Group } from '../types/Group';
import { Winston } from '../loggers/Winston'
class GroupService {

    private groupModel;

    constructor(groupModel: any) {
        this.groupModel = groupModel;
    }

    async createGroup(user: Group) {
        Winston.log({ level: 'debug', message: `${this.constructor.name}::${this.createGroup.name}`, attributes: arguments });
        let result = await this.groupModel.create(user);
        return result.toJSON();
    }

    async updateGroup(groupId: string, data: object) {
        Winston.log({ level: 'debug', message: `${this.constructor.name}::${this.updateGroup.name}`, attributes: arguments });
        await this.groupModel.update(data, { where: { id: groupId } });
        return await this.groupModel.findByPk(groupId);
    }

    async getGroup(groupId: number) {
        Winston.log({ level: 'debug', message: `${this.constructor.name}::${this.getGroup.name}`, attributes: arguments });
        return await this.groupModel.findByPk(groupId);
    }

    async getAllGroups() {
        Winston.log({ level: 'debug', message: `${this.constructor.name}::${this.getAllGroups.name}`, attributes: arguments });
        return await this.groupModel.findAll();
    }

    async removeGroup(groupId: number) {
        Winston.log({ level: 'debug', message: `${this.constructor.name}::${this.removeGroup.name}`, attributes: arguments });
        return await this.groupModel.destroy({ where: { id: groupId } });
    }

}
export { GroupService };