import { Module } from '@nestjs/common';
import { AboutService } from './services/about.service';
import { AboutController } from './controllers/about.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AboutSchema } from './entities/about.entity';
import { AboutRepository } from './repositories/about.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'About', schema: AboutSchema }]),
  ],
  controllers: [AboutController],
  providers: [AboutService, AboutRepository],
})
export class AboutModule {}
