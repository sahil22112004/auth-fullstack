import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../auth/entities/auth.entity';

export default setSeederFactory(User, (faker) => {
    const user = new User();
    user.username= "Admin"
    user.email = "admin123@gmail.com"
    user.role = "admin"
    user.password = "admin123"
    return user;
})