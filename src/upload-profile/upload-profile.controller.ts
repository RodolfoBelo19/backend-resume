import {
  Controller,
  Post,
  Get,
  Param,
  Res,
  UploadedFile,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './image.schema';

@Controller('upload-profile')
export class UploadProfileController {
  constructor(
    @InjectModel(Image.name) private readonly imageModel: Model<Image>,
  ) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    // salvar a imagem no MongoDB aqui e retornar a URL de acesso à imagem
    const image = new this.imageModel({
      filename: file.filename,
      path: file.path,
      contentType: file.mimetype,
    });
    await image.save();
    return {
      imageUrl: `http://localhost:3010/upload-profile/image/${image.filename}`,
    };
  }

  @Get('image/:filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    // buscar a imagem no MongoDB aqui e enviar o seu conteúdo como resposta
    const image = await this.imageModel.findOne({ filename }).exec();
    if (!image) {
      throw new NotFoundException(`Imagem ${filename} não encontrada`);
    }
    res.set('Content-Type', image.contentType);
    return res.sendFile(image.path, { root: '.' });
  }
}
