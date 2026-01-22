import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../auth/entities/auth.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.username = faker.internet.userName();
  user.email = faker.internet.email();
  user.role = 'user';
  user.password = faker.internet.password(); 
  return user;
});