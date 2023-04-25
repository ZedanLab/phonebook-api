import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateContactsTable1682345785189 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contacts',
        columns: [
          {
            name: 'id',
            type: 'BIGINT',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: 'first_name',
            type: 'varchar',
            length: '255',
            isPrimary: false,
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'varchar',
            length: '255',
            isPrimary: false,
            isNullable: false,
          },
          {
            name: 'mobile',
            type: 'varchar',
            length: '255',
            isPrimary: false,
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isPrimary: false,
            isNullable: true,
            isUnique: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contacts');
  }
}
