import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mongodbrd:ErfDh4b0slpeNtkk@cluster0.uboej.mongodb.net/?retryWrites=true&w=majority',
    ),
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
