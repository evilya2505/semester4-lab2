import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Федорова', description: 'Фамилия пользователя' })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ example: 'Анастасия', description: 'Имя пользователя' })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ example: 'test@mail.ru', description: 'Электронная почта' })
  @IsString()
  @IsEmail()
  @MinLength(3)
  @IsNotEmpty()
  email: string;
}
