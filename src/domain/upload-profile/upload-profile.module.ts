import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadProfileController } from './upload-profile.controller';
import { ImageSchema } from './image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
  ],
  controllers: [UploadProfileController],
})
export class UploadProfileModule {}
