import { Injectable } from '@nestjs/common';
import { CriaProdutosDTO } from './dto/criaProdutos.dto';

@Injectable()
export class ProdutosRepository {
  private produtos: CriaProdutosDTO[] = [];

  async salvar(dadosDoProduto: CriaProdutosDTO) {
    return this.produtos.push(dadosDoProduto);
  }

  async listar() {
    return this.produtos;
  }
}
