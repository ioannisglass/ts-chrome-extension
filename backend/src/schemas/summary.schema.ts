import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SummaryDocument = HydratedDocument<Summary>;

@Schema()
export class Summary {
  @Prop()
  hText: string;

  @Prop()
  sText: string;

  @Prop()
  date: Date;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);