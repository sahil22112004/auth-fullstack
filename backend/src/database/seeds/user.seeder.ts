import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../auth/entities/auth.entity';

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        // const repository =  dataSource.getRepository(User);
        // await repository.insert([
        //     {
        //         username: 'Caleb',
        //         email: 'Barrows',
        //         password: 'caleb.barrows@gmail.com',
        //         status:'admin'
        //     }
        // ]);

        // ---------------------------------------------------

        const userFactory = factoryManager.get(User);
        // save 1 factory generated entity, to the database
        await userFactory.save();


    }
}