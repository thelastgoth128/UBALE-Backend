import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, ForgotPasswordDto, ResetPasswordDto, SignInDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Public } from "./guards/public";
import { UserService } from '../user/user.service';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService : UserService
  ) {}

  @Post('login')
  signIn(@Body() signInDto:SignInDto){
    return this.authService.signIn(signInDto.phone,signInDto.password)
  }
  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto:ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email)
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto) {
    const user = await this.userService.findMail(resetPasswordDto.email)

    if (!user) {
      throw new NotFoundException('user not found')
    }
    const number = user.phone

    const valid = await this.authService.verifyOTP(number,resetPasswordDto.otp)
    
    if (valid == false) {
      throw new ForbiddenException('invalid otp')
    }

    return this.authService.resetPassword(user.email,resetPasswordDto.newPassword)

  }
}
