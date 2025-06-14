import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './components/auth/guards/auth.guard';
import { FirebaseService } from './components/services/firebase.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Ubale')
  .setDescription('Ubale controller documentation')
  .setVersion('1.0.0')
  .build();

  const document = SwaggerModule.createDocument(app,config)

  SwaggerModule.setup('api', app, document)
  
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
