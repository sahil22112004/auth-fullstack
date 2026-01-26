import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class OrderMigration1769443378962 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()"
          },
          {
            name: "userId",
            type: "int"
          },
          {
            name: "sellerId",
            type: "int"
          },
          {
            name: "addressId",
            type: "int"
          },
          {
            name: "productId",
            type: "int"
          },
          {
            name: "productName",
            type: "varchar"
          },
          {
            name: "quantity",
            type: "int"
          },
          {
            name: "price",
            type: "decimal",
            precision: 10,
            scale: 2
          },
          {
            name: "totalAmount",
            type: "decimal",
            precision: 10,
            scale: 2
          },
          {
            name: "status",
            type: "enum",
            enum: ["processing", "shipped", "delivered", "cancelled"],
            default: "'processing'"
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP"
          }
        ]
      }),
      true
    );

    await queryRunner.createForeignKey(
      "orders",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "orders",
      new TableForeignKey({
        columnNames: ["sellerId"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "orders",
      new TableForeignKey({
        columnNames: ["addressId"],
        referencedTableName: "address",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "orders",
      new TableForeignKey({
        columnNames: ["productId"],
        referencedTableName: "products",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("orders");
  }
}
