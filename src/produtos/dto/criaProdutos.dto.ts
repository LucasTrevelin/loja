import {
  ArrayMinSize,
  IsNotEmpty,
  isNotEmpty,
  IsNumber,
  IsPositive,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CaracteristicaProdutoDTO {
  nome: string;
  descricao: string;
}

export class ImagemProdutoDTO {
  url: string;
  descricao: string;
}

export class CriaProdutosDTO {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;
  @IsNumber(undefined, { message: 'Valor inválido' })
  @IsPositive({ message: 'Valor deve ser positivo' })
  valor: number;
  @Min(0, { message: 'Quantidade deve ser positiva' })
  quantidade: number;
  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  @MaxLength(100, { message: 'Descrição deve ter no máximo 100 caracteres' })
  descricao: string;
  @ArrayMinSize(3, {
    message: 'Deve ter no mínimo três características',
  })
  caracteristicas: CaracteristicaProdutoDTO[];
  @ArrayMinSize(1, { message: 'Deve ter no mínimo uma imagem' })
  imagens: ImagemProdutoDTO[];
  @IsNotEmpty({ message: 'Categoria é obrigatória' })
  categoria: string;
}
