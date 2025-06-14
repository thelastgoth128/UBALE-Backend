import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Public } from "./guards/public";
import { UserService } from '../user/user.service';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto:Record<string,any>){
    return this.authService.signIn(signInDto.phone,signInDto.password)
  }
  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto:Record<string,any>) {
    return this.authService.forgotPassword(forgotPasswordDto.email)
  }

  @Post('reset-password')
  async resetPassword(
    @Body('email') email: string,
    @Body('otp') otp : string,
    @Body('newPassword') newPassword: string
  ){
    const user = await this.userService.findMail(email)

    if (!user) {
      throw new NotFoundException('user not found')
    }
    const number = user.phone

    const valid = await this.authService.verifyOTP(number,otp)
    
    if (valid == false) {
      throw new ForbiddenException('invalid otp')
    }

    return this.authService.resetPassword(user.email,newPassword)

  }
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
