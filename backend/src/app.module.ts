import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Summary, SummarySchema } from './schemas/summary.schema';
import { SummaryService } from './service/summary.service';

require('dotenv').config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGOURI), MongooseModule.forFeature([{ name : Summary.name, schema: SummarySchema }])],
  controllers: [AppController],
  providers: [AppService, SummaryService],
})
export class AppModule {}
