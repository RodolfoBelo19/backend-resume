import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { About } from './entities/about.entity';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';

@Injectable()
export class AboutService {
  constructor(@InjectModel('About') private aboutModel: Model<About>) {}

  async create(createAboutDto: CreateAboutDto): Promise<About> {
    const createdAbout = await new this.aboutModel(createAboutDto).save();
    return createdAbout;
  }

  async findAll(): Promise<About[]> {
    const documents = await this.aboutModel.find().exec();
    return documents.map((doc) => doc.toObject());
  }

  async findOne(id: string): Promise<About> {
    return await this.aboutModel.findById(id).exec();
  }

  async update(id: string, updateAboutDto: UpdateAboutDto): Promise<About> {
    const updatedAbout = await this.aboutModel.findByIdAndUpdate(
      id,
      updateAboutDto,
    );
    return updatedAbout;
  }

  async remove(id: string): Promise<About> {
    return await this.aboutModel.findByIdAndRemove(id);
  }
}
