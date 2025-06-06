import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './components/user/user.module';
import { ComponentsModule } from './auth/components/components.module';
import { AuthModule } from './components/auth/auth.module';

@Module({
  imports: [UserModule, ComponentsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
