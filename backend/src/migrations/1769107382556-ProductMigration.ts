import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ProductMigration1769107382556 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({ 
            name: "products", 
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "productName",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "price",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "rating",
                    type: "int",
                    isNullable: false,
                    default: 0
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "photoUrl",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "userId",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "categoryId",
                    type: "int",
                    isNullable: false,
                }
            ],
        }), true);

        await queryRunner.createForeignKey(
            "products",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            })
        );

        await queryRunner.createForeignKey(
            "products",
            new TableForeignKey({
                columnNames: ["categoryId"],
                referencedColumnNames: ["id"],
                referencedTableName: "categories",
                onDelete: "SET NULL"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products");
    }

}
