import { Injectable } from '@nestjs/common';
import { AboutRepository } from '../repositories/about.repository';
import { CreateAboutDto } from '../dto/create-about.dto';
import { UpdateAboutDto } from '../dto/update-about.dto';

@Injectable()
export class AboutService {
  constructor(private readonly aboutRepository: AboutRepository) {}

  async create(createAboutDto: CreateAboutDto) {
    return this.aboutRepository.create(createAboutDto);
  }

  async findAll() {
    return this.aboutRepository.findAll();
  }

  async findOne(id: string) {
    return this.aboutRepository.findById(id);
  }

  async update(id: string, updateAboutDto: UpdateAboutDto) {
    return this.aboutRepository.update(id, updateAboutDto);
  }

  async remove(id: string) {
    return this.aboutRepository.delete(id);
  }
}
