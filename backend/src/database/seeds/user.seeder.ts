import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../auth/entities/auth.entity';

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository =  dataSource.getRepository(User);
        const adminExists = await repository.findOne({
             where: { email: 'admin@gmail.com' },
            });

            if (!adminExists) {
            await repository.insert({
                username: 'Admin',
                email: 'admin@gmail.com',
                role: 'admin',
                password: 'admin123'
                });
            }

        // const userFactory = factoryManager.get(User);
        // // save 1 factory generated entity, to the database
        // await userFactory.save();


    }
}