import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterResponseDto } from './dto/register-response-dto';
import { LoginResponseDto } from './dto/login-response-dto';
import { TokenSevice } from 'src/token/token.service';
import { LoginUserDto } from './dto/login-user-dto';
import { CreateUserDto } from 'src/users/dto/create-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenSevice,
  ) {}

  async register(newUser: CreateUserDto): Promise<RegisterResponseDto> {
    const existUser = await this.usersService.findUserByEmail(newUser.email);

    if (existUser)
      throw new BadRequestException(
        'Пользователь с таким email уже существует.',
      );

    const user = await this.usersService.create(newUser);
    return await this.usersService.publicUser(user.id);
  }

  async loginUser(user: LoginUserDto): Promise<LoginResponseDto> {
    const existUser = await this.usersService.findUserByEmail(user.email);
    if (!existUser)
      throw new BadRequestException(
        'Неправильный пароль или электронная почта.',
      );
    const validatePassword = await bcrypt.compare(
      user.password,
      existUser.password,
    );
    if (!validatePassword)
      throw new BadRequestException(
        'Неправильный пароль или электронная почта.',
      );
    const userData = {
      id: existUser.id,
      email: existUser.email,
    };
    const token = await this.tokenService.generateJwtToken(userData);
    return { token };
  }
}
