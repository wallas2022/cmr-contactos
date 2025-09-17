import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';



async function bootstrap() {
const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,     // <-- convierte strings a números/boolean/date según DTO
    whitelist: true,
    forbidNonWhitelisted: false,
  }));
app.setGlobalPrefix('api');
app.useGlobalInterceptors(new TransformInterceptor());


const config = new DocumentBuilder()
.setTitle('Gestión de Contactos')
.setDescription('APIs para contactos, interacciones, búsqueda avanzada, import/export, preferencias, perfiles sociales, alertas y actividad')
.setVersion('1.0.0')
.addBearerAuth()
.build();


const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);


await app.listen(process.env.PORT || 3000);
}
bootstrap();