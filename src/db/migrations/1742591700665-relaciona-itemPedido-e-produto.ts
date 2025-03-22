import { MigrationInterface, QueryRunner } from "typeorm";

export class RelacionaItemPedidoEProduto1742591700665 implements MigrationInterface {
    name = 'RelacionaItemPedidoEProduto1742591700665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itens_pedido" ADD "produtoId" uuid`);
        await queryRunner.query(`ALTER TABLE "itens_pedido" ADD CONSTRAINT "FK_496c47b9befb817d2595f65a901" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itens_pedido" DROP CONSTRAINT "FK_496c47b9befb817d2595f65a901"`);
        await queryRunner.query(`ALTER TABLE "itens_pedido" DROP COLUMN "produtoId"`);
    }

}
