import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const frontUrl = configService.get<string>('FRONT_URL');
  console.log('CORS frontUrl =', frontUrl);
  app.enableCors({
    origin: frontUrl,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: false,
  });

  const config = new DocumentBuilder()
      .setTitle('Movie API')
      .setDescription('Movie API for test at RVD')
      .setVersion('1.0')
      .addTag('Movie')
      .addTag('Comment')
      .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port);
}
bootstrap();
