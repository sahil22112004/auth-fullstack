import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddressMigration1769443359101 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "address",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "userId",
            type: "int"
          },
          {
            name: "fullName",
            type: "varchar"
          },
          {
            name: "street",
            type: "varchar"
          },
          {
            name: "city",
            type: "varchar"
          },
          {
            name: "state",
            type: "varchar"
          },
          {
            name: "zipCode",
            type: "varchar"
          },
          {
            name: "country",
            type: "varchar"
          },
          {
            name: "phoneNumber",
            type: "varchar"
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("address");
  }
}
