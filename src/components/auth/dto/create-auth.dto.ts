import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {}

export class SignInDto {
  @ApiProperty()
  phone: string;

  @ApiProperty()
  password: string;
}

export class ForgotPasswordDto {
  @ApiProperty()
  email: string;
}

