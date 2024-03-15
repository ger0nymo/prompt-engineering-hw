import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import * as process from "process";
import { ConfigModule } from "@nestjs/config";
import { QuestionModule } from './question/question.module';

const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://geronymo:${MONGODB_PASSWORD}@cluster0.izwbk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
      dbName: 'test'
    }),
    AuthModule,
    UserModule,
    QuestionModule,
    ConfigModule.forRoot(),
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
