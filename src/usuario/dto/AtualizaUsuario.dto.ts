import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { EmailEhUnico } from '../validacao/email-eh-unico.validator';

export class AtualizaUsuarioDTO {
  @IsString()
  @IsOptional()
  nome: string;

  @IsEmail(undefined, { message: 'Email inválido' })
  @EmailEhUnico({ message: 'Já existe um usuário com este e-mail' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  @IsOptional()
  senha: string;
}
