import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './core/guards/auth.guard';
import { AppClusterService } from './app.cluster.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);

  app.useGlobalGuards(new AuthGuard(reflector, jwtService));
  app.setGlobalPrefix('api/events/v1');
  const port = configService.get('PORT') || 3001;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`); 
}

AppClusterService.clusterize(bootstrap);