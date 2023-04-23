import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { Response } from 'express';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    const savedImage = await this.imageService.saveImage(file);
    return savedImage.id;
  }

  @Get(':id')
  async serveImage(@Param('id') id: string, @Res() res: Response) {
    const image = await this.imageService.getImageById(id);

    if (image && image.path) {
      res.setHeader('Content-Type', image.mimetype);
      res.sendFile(image.path);
    } else {
      res.status(404).send('File not found');
    }
  }

  @Get()
  async getAll() {
    return await this.imageService.getAll();
  }

  @Delete(':id')
  async deleteImage(@Param('id') id: string) {
    return await this.imageService.deleteImageById(id);
  }
}
