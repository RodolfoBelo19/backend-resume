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
    console.log('Salvando imagem:', file.filename);
    const image = new this.imageModel({
      filename: file.filename,
      mimetype: file.mimetype,
      path: file.path,
    });
    console.log('Imagem criada:', image);
    await image.save();
    console.log('Imagem salva:', image);
    const savedImage = image.toObject({
      versionKey: false,
      transform: (doc, ret) => {
        // Mantenha o ID da imagem se necessário
        // delete ret._id;
      },
    });
    console.log('Imagem transformada:', savedImage);
    return savedImage;
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
