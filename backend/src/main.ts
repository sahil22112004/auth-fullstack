import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin:'*'
  })
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform: true
  }))
  app.use("/temp", express.static("temp"));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import * as express from "express";
// import { configure as serverlessExpress } from '@codegenie/serverless-express';
// import { Callback, Context, Handler } from 'aws-lambda';

// let cachedServer: Handler;

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
  
//   app.enableCors({ origin: '*' });
//   app.useGlobalPipes(new ValidationPipe({
//     whitelist: true,
//     transform: true
//   }));

//   // On Vercel, /tmp is the only writable directory
//   // Static files served from here will be TEMPORARY (deleted after request)
//   app.use("/uploads", express.static("/tmp"));

//   await app.init();

//   const expressApp = app.getHttpAdapter().getInstance();
//   return serverlessExpress({ app: expressApp });
// }

// // Vercel Entry Point
// export const handler: Handler = async (
//   event: any,
//   context: Context,
//   callback: Callback,
// ) => {
//   if (!cachedServer) {
//     cachedServer = await bootstrap();
//   }
//   return cachedServer(event, context, callback);
// };

