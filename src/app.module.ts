import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadProfileModule } from './upload-profile/upload-profile.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mongodbrd:ErfDh4b0slpeNtkk@cluster0.uboej.mongodb.net/?retryWrites=true&w=majority',
    ),
    UploadProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
