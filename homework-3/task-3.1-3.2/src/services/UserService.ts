import {User} from '../types/User';
import {Users} from '../models/Users';

class UserService {

    async createUser(user: User) {
        let result = await Users.create(user);
        return result.toJSON();
    }

}
export { UserService };