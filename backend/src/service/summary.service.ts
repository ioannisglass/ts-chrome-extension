import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSummaryDto } from 'src/dto/create-summary.dto';
import { ISummary } from 'src/interface/summary.interface';
import { Model } from "mongoose";
import { UpdateSummaryDto } from 'src/dto/update-summary.dto';
@Injectable()
export class SummaryService {
constructor(@InjectModel('Summary') private SummaryModel:Model<ISummary>) { }
async createSummary(createSummaryDto: CreateSummaryDto): Promise<ISummary> {
   const newSummary = await new this.SummaryModel(createSummaryDto);
   return newSummary.save();
}
async updateSummary(SummaryId: string, updateSummaryDto: UpdateSummaryDto): Promise<ISummary> {
    const existingSummary = await        this.SummaryModel.findByIdAndUpdate(SummaryId, updateSummaryDto, { new: true });
   if (!existingSummary) {
     throw new NotFoundException(`Summary #${SummaryId} not found`);
   }
   return existingSummary;
}
async getAllSummarys(): Promise<ISummary[]> {
    const SummaryData = await this.SummaryModel.find();
    if (!SummaryData || SummaryData.length == 0) {
        throw new NotFoundException('Summarys data not found!');
    }
    return SummaryData;
}
async getSummary(SummaryId: string): Promise<ISummary> {
   const existingSummary = await     this.SummaryModel.findById(SummaryId).exec();
   if (!existingSummary) {
    throw new NotFoundException(`Summary #${SummaryId} not found`);
   }
   return existingSummary;
}
async deleteSummary(SummaryId: string): Promise<ISummary> {
    const deletedSummary = await this.SummaryModel.findByIdAndDelete(SummaryId);
   if (!deletedSummary) {
     throw new NotFoundException(`Summary #${SummaryId} not found`);
   }
   return deletedSummary;
}
}