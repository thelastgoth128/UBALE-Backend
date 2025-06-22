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

export class ResetPasswordDto {
    @ApiProperty()
    email : string
    otp : string
    newPassword : string
}
