import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class WishlistMigration1769505014900 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({ 
                    name: "wishlist", 
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true,
                            generationStrategy: "uuid",
                            default: "uuid_generate_v4()"
                        },
                        {
                            name: "productId",
                            type: "int",
                            isNullable: false,
                        },
                        {
                            name: "userId",
                            type: "int",
                            isNullable: false,
                        },
                    ],
                }), true);
                await queryRunner.createForeignKey(
                      "wishlist",
                      new TableForeignKey({
                        columnNames: ["userId"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                      })
                    );
                
                    await queryRunner.createForeignKey(
                      "wishlist",
                      new TableForeignKey({
                        columnNames: ["productId"],
                        referencedTableName: "products",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                      })
                    );
    }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("wishlist");
    }

}
