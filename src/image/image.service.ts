import { Injectable, NotFoundException } from '@nestjs/common';
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
    return image.toObject({
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id;
      },
    });
  }

  async getImageById(id: string): Promise<Image> {
    const image = await this.imageModel.findById(id).lean().exec();
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    return image;
  }

  async getAll(): Promise<Image[]> {
    return await this.imageModel.find().lean().exec();
  }

  async deleteImageById(id: string): Promise<Image> {
    return await this.imageModel.findByIdAndDelete(id).lean().exec();
  }
}
