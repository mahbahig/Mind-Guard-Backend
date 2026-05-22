import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Mind Guard Backend APIs')
  .setDescription('API documentation. This documentation provides details about the endpoints, request/response formats, and authentication methods for the Mind Guard backend application. By: Mahmoud Bahig')
  .setVersion("1.0")
  .addBearerAuth()
  .build();
