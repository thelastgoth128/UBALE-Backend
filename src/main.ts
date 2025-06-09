import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './components/auth/guards/auth.guard';
import { FirebaseService } from './components/services/firebase.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const firebaseService = app.get(FirebaseService);
  const reflector = app.get(Reflector);

  app.useGlobalGuards(new AuthGuard(firebaseService, reflector));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
