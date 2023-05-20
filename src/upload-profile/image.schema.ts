import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  @Prop()
  filename: string;

  @Prop()
  path: string;

  @Prop()
  data: Buffer;

  @Prop()
  contentType: string;

  @Prop()
  originalname: string;

  @Prop()
  mimetype: string;

  @Prop()
  size: number;

  @Prop()
  url: string;

  public save: () => Promise<ImageDocument>;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
