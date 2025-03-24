import { PartialType } from '@nestjs/mapped-types';
import { IsEnum } from 'class-validator';
import { StatusPedido } from '../enum/statusPedido.enum';

export class AtualizaPedidoDTO {
  @IsEnum(StatusPedido)
  status: StatusPedido;
}
