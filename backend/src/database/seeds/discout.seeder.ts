import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Discount } from '../../discounts/entities/discount.entity';

export default class DiscountSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository =  dataSource.getRepository(Discount);
        // const adminExists = await repository.findOne({
        //      where: { email: 'admin@gmail.com' },
        //     });

            // if (!adminExists) {
            await repository.insert([{
                discountName: 'PROMO50',
                discountPercentage:'50'

                },
                {
                discountName: 'PROMO30',
                discountPercentage:'30'   
                },
                {
                discountName: 'PROMO10',
                discountPercentage:'10'   
                }
            ]
            );
            // }

        // const userFactory = factoryManager.get(User);
        // // save 1 factory generated entity, to the database
        // await userFactory.save();


    }
}