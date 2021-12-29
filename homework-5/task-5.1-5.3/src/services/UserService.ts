import { QueryTypes, sequelize } from '../data-access/sequelize';
import { User } from '../types/User';
import { Winston } from '../loggers/Winston'
class UserService {

    private userModel;

    constructor(userModel: any) {
        this.userModel = userModel;
    }

    async createUser(user: User) {
        Winston.log({ level: 'debug', message: `${this.constructor.name}::${this.createUser.name}`, attributes: arguments });
        let result = await this.userModel.create(user);
        return result.toJSON();
    }

    async updateUser(userId: string, data: object) {
        Winston.log({ level: 'debug', message: `${this.constructor.name}::${this.updateUser.name}`, attributes: arguments });
        await this.userModel.update(data, { where: { id: userId } });
        return await this.userModel.findByPk(userId);
    }

    async getAutoSuggestedUsers(loginSubstring: string, sqlLimit: number) {
        Winston.log({ level: 'debug', message: `${this.constructor.name}::${this.getAutoSuggestedUsers.name}`, attributes: arguments });
        let listQuery = "SELECT id, login, password, age, is_deleted FROM users WHERE login LIKE '%" + loginSubstring + "%' ORDER BY login ASC LIMIT " + sqlLimit;
        return await sequelize.query(listQuery, { type: QueryTypes.SELECT });
    }

    async getUser(userId: number) {
        Winston.log({ level: 'debug', message: `${this.constructor.name}::${this.getUser.name}`, attributes: arguments });
        return await this.userModel.findByPk(userId);
    }

}
export { UserService };