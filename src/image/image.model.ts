import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  @Prop()
  id: string;

  @Prop()
  filename: string;

  @Prop()
  mimetype: string;

  @Prop()
  path: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
