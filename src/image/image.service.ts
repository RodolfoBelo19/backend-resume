import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './image.model';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image.name) private readonly imageModel: Model<ImageDocument>,
  ) {}

  async saveImage(file: Express.Multer.File): Promise<Image> {
    const image = new this.imageModel({
      filename: file.filename,
      mimetype: file.mimetype,
      path: file.path,
    });

    await image.save();
    return image.toObject();
  }

  async getImageById(id: string): Promise<Image> {
    return this.imageModel.findById(id).lean().exec();
  }
}
