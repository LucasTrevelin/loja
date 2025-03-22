import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { CriaPedidoDTO } from './dto/CriaPedido.dto.';
import { PedidoEntity } from './pedido.entity';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  create(
    @Query('usuarioId') usuarioId: UsuarioEntity['id'],
    @Body() dadosDoPedido: CriaPedidoDTO,
  ) {
    return this.pedidoService.cadastraPedido(usuarioId, dadosDoPedido);
  }

  @Get()
  async obtemPedidosDeUsuario(
    @Query('usuarioId') usuarioId: UsuarioEntity['id'],
  ) {
    const pedidoCriado = await this.pedidoService.obtemPedidosDeUsuario(
      usuarioId,
    );

    return pedidoCriado;
  }

  //@Get(':id')
  //findOne(@Param('id') id: string) {
  //  return this.pedidoService.findOne(+id);
  //}

  @Patch(':id')
  update(
    @Param('id') pedidoId: PedidoEntity['id'],
    @Body() dadosDeAtualização: AtualizaPedidoDTO,
  ) {
    return this.pedidoService.atualizaPedido(pedidoId, dadosDeAtualização);
  }

  //@Delete(':id')
  //remove(@Param('id') id: string) {
  //  return this.pedidoService.remove(+id);
  //}
}
