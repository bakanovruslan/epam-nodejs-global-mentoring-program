import { QueryTypes, sequelize } from '../data-access/sequelize';
import { User } from '../types/User';
class UserService {

    private userModel;

    constructor(userModel: any) {
        this.userModel = userModel;
    }

    async createUser(user: User) {
        let result = await this.userModel.create(user);
        return result.toJSON();
    }

    async updateUser(userId: string, data: object) {
        await this.userModel.update(data, { where: { id: userId } });
        return await this.userModel.findByPk(userId);
    }

    async getAutoSuggestedUsers(loginSubstring: string, sqlLimit: number) {
        let listQuery = "SELECT id, login, password, age, is_deleted FROM users WHERE login LIKE '%" + loginSubstring + "%' ORDER BY login ASC LIMIT " + sqlLimit;
        return await sequelize.query(listQuery, { type: QueryTypes.SELECT });
    }

    async getUser(userId: number) {
        return await this.userModel.findByPk(userId);
    }

}
export { UserService };