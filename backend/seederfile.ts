import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import UserSeeder from './src/database/seeds/user.seeder';
import UserFactory from './src/database/factories/user.factory';
import { AppDataSource } from 'data-source';

(async () => {
    await AppDataSource.initialize();

    await runSeeders(AppDataSource);
})();