import {
  Controller,
  Post,
  Get,
  Param,
  Res,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './image.schema';
import { UploadedFile } from '@nestjs/common';

@Controller('upload-profile')
export class UploadProfileController {
  constructor(
    @InjectModel(Image.name) private readonly imageModel: Model<ImageDocument>,
  ) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    // Salve a imagem no MongoDB aqui e retorne a URL de acesso à imagem
    const image = new this.imageModel({
      filename: file.originalname,
      data: file.buffer,
      contentType: file.mimetype,
    });
    await image.save();
    return {
      imageUrl: `http://localhost:3010/upload-profile/image/${image._id}`,
    };
  }

  @Get('image/:id')
  async getImage(@Param('id') id: string, @Res() res: Response) {
    // Busque a imagem no MongoDB aqui e envie o seu conteúdo como resposta
    const image = await this.imageModel.findById(id);
    if (!image) {
      throw new NotFoundException(`Imagem ${id} não encontrada`);
    }
    res.set('Content-Type', image.contentType);
    return res.send(image.data); // Envie o buffer de dados da imagem como resposta
  }
}
