import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './components/auth/guards/auth.guard';
import { FirebaseService } from './components/services/firebase.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const firebaseService = app.get(FirebaseService);
  const reflector = app.get(Reflector);

  app.useGlobalGuards(new AuthGuard(firebaseService, reflector));

  const port = process.env.APP_PORT || 4000;
  await app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
}
bootstrap();
