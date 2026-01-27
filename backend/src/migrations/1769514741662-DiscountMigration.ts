import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class DiscountMigration1769514741662 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner
        .createTable(new Table({ 
                name: "discount", 
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "discountName",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "discountPercentage",
                        type: "varchar",
                        isNullable: false,
                    },
                    ],
                }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("discount");
    }

}
