import { IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

import { CriaUsuarioDTO } from './CriaUsuario.dto';

export class AtualizaUsuarioDTO extends PartialType(CriaUsuarioDTO) {}
