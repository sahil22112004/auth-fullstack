
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ProductMigration1769065060069 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({ 
            name: "products", columns: [
                { name: "id", 
                type: "int", 
                isPrimary: true, 
                isGenerated: true, 
                generationStrategy: "increment", }, 

                // { name: "productid", 
                // type: "bigint", 
                // isUnique: true, }, 

                { name: "productName", 
                type: "varchar", }, 

                { name: "price", 
                type: "int", }, 

                { name: "category", 
                type: "varchar", }, 
                
                { name: "subcategory", 
                type: "varchar", }, 

                { name: "description", 
                type: "varchar", }, 

                { name: "photoUrl", 
                type: "varchar", }, 

                { name: "rating", 
                type: "int", }, 

                { name: "userId", 
                type: "varchar", },], 
            }), true,);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products");
    }


}

