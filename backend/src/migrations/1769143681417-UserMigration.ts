import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserMigration1769143681417 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "username",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "role",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                    name: "isBlocked",
                    type: "boolean",
                    isNullable: false,
                    default: false
                }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}