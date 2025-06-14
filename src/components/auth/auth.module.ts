import { forwardRef,Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { FirebaseService } from '../services/firebase.service';
import { MailService } from '../services/mail.service';

@Module({
  imports:[
    forwardRef(()=>UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService,FirebaseService,MailService],
  exports:[FirebaseService]
})
export class AuthModule {}
