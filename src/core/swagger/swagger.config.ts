import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Mind Guard Backend API Endpoint Documentation - By: Mahmoud Bahig')
  .setDescription(
    'API documentation. This documentation provides details about the endpoints, request/response formats, and authentication methods for the Mind Guard backend application',
  )
  .setVersion('1.0')
  .addBearerAuth()
  .build();
