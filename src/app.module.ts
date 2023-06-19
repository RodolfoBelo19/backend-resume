import { Module } from '@nestjs/common';
import { AboutModule } from './domain/about/about.module';
import { MongodbModule } from './shared/infra/database/mongodb.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AboutModule, MongodbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
