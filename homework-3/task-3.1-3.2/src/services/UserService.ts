import {User} from '../types/User';
class UserService {

    private userModel;

    constructor(userModel: any) {
        this.userModel = userModel;
    }

    async createUser(user: User) {
        let result = await this.userModel.create(user);
        return result.toJSON();
    }

}
export { UserService };