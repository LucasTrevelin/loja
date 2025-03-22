import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { In, Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/statusPedido.enum';
import { CriaPedidoDTO } from './dto/CriaPedido.dto.';
import { ItemPedidoEntity } from './itemPedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  private async buscaUsuario(id) {
    const usuario = await this.usuarioRepository.findOneBy({ id: id });

    if (usuario === null) {
      throw new NotFoundException('usuario não foi encontrado');
    }
  }

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.buscaUsuario(usuarioId);

    const produtosId = dadosDoPedido.itensPedido.map(
      (itemPedido) => itemPedido.produtoId,
    );

    const produtosRelacionados = await this.produtoRepository.findBy({
      id: In(produtosId),
    });

    const pedidoEntity = new PedidoEntity();

    (pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO),
      (pedidoEntity.usuario = usuario);

    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const itemPedidoEntity = new ItemPedidoEntity();

      const produtoRelacionado = produtosRelacionados.find((produto) => {
        return produto.id === itemPedido.produtoId;
      });

      itemPedidoEntity.produto = produtoRelacionado;
      itemPedidoEntity.precoVenda = produtoRelacionado.valor;
      itemPedidoEntity.quantidade = itemPedido.quantidade;
      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade;

      return itemPedidoEntity;
    });

    const valorTotal = itensPedidoEntidades.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade;
    }, 0);

    pedidoEntity.itensPedido = itensPedidoEntidades;

    pedidoEntity.valorTotal = valorTotal;

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);

    return pedidoCriado;
  }

  async obtemPedidosDeUsuario(usuarioId: string) {
    return this.pedidoRepository.find({
      where: {
        usuario: { id: usuarioId },
      },
      relations: {
        usuario: true,
      },
    });
  }

  async atualizaPedido(
    usuarioId: PedidoEntity['id'],
    dadosDeAtualização: AtualizaPedidoDTO,
  ) {
    const pedidoAtualizado = await this.pedidoRepository.findOneBy({
      id: usuarioId,
    });

    Object.assign(pedidoAtualizado, dadosDeAtualização);

    this.pedidoRepository.save(pedidoAtualizado);

    return {
      pedido: pedidoAtualizado,
      message: 'pedido atualizado com sucesso.',
    };
  }
}
