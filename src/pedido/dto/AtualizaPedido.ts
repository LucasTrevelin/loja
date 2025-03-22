import { PartialType } from '@nestjs/mapped-types';
import { CriaPedidoDTO } from './CriaPedido.dto.';
import { IsEnum } from 'class-validator';
import { StatusPedido } from '../enum/statusPedido.enum';

export class AtualizaPedidoDTO extends PartialType(CriaPedidoDTO) {
  @IsEnum(StatusPedido)
  status: StatusPedido;
}
