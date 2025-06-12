import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './components/auth/guards/auth.guard';
import { FirebaseService } from './components/services/firebase.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  await app.listen(process.env.PORT || 8080);
}
bootstrap();
