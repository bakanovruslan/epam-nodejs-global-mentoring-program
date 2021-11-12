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
        // console.log(16);
        // console.log(typeof userId);
        // console.log(typeof data);

        await this.userModel.update(data, { where: { id: userId } });
        return await this.userModel.findByPk(userId);

    }

}
export { UserService };