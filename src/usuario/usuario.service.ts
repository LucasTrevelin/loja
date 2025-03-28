import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criaUsuario(dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    Object.assign(usuarioEntity, dadosDoUsuario as UsuarioEntity);

    return this.usuarioRepository.save(usuarioEntity);
  }

  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );
    return usuariosLista;
  }

  async buscaPorEmail(email: string) {
    const checkEmail = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (checkEmail === null) {
      throw new NotFoundException('Email não encontrado.');
    }
    return checkEmail;
  }

  async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
    const usuarioAtualizado = await this.usuarioRepository.findOneBy({ id });

    if (usuarioAtualizado === null) {
      throw new NotFoundException('O pedido não foi encontrado.');
    }

    Object.assign(usuarioAtualizado, usuarioAtualizado as UsuarioEntity);

    this.usuarioRepository.save(usuarioAtualizado);

    return {
      usuario: usuarioAtualizado,
      message: 'usuario atualizado com sucesso.',
    };
  }

  async deletaUsuario(id: string) {
    const resultado = await this.usuarioRepository.delete(id);

    if (!resultado.affected)
      throw new NotFoundException('O usuário não foi encontrado.');
  }
}
