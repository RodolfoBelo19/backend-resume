import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { About } from '../entities/about.entity';
import { CreateAboutDto } from '../dto/create-about.dto';
import { UpdateAboutDto } from '../dto/update-about.dto';

@Injectable()
export class AboutRepository {
  constructor(@InjectModel('About') private aboutModel: Model<About>) {}

  async create(createAboutDto: CreateAboutDto): Promise<About> {
    const createdAbout = await new this.aboutModel(createAboutDto).save();
    return createdAbout;
  }

  async findAll(): Promise<About[]> {
    const documents = await this.aboutModel.find().exec();
    return documents.map((doc) => doc.toObject());
  }

  async findById(id: string): Promise<About> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('Invalid ID');
    }

    const about = await this.aboutModel.findById(id).exec();
    if (!about) {
      throw new NotFoundException('About not found');
    }

    return about.toObject();
  }

  async update(id: string, updateAboutDto: UpdateAboutDto): Promise<About> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('Invalid ID');
    }

    const about = await this.aboutModel
      .findByIdAndUpdate(id, updateAboutDto, { new: true })
      .exec();

    if (!about) {
      throw new NotFoundException('About not found');
    }

    return about.toObject();
  }

  async delete(id: string): Promise<About> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('Invalid ID');
    }

    const about = await this.aboutModel.findByIdAndRemove(id).exec();
    if (!about) {
      throw new NotFoundException('About not found');
    }

    return about.toObject();
  }
}
