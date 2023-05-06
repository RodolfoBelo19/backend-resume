import * as mongoose from 'mongoose';

export const AboutSchema = new mongoose.Schema({
  description_pt: { type: String, required: true },
  description_en: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  localization: { type: String, required: true },
  language: { type: [String], required: true },
  user_id: { type: String, required: true },
});

export interface About extends mongoose.Document {
  id: string;
  description_pt: string;
  description_en: string;
  age: number;
  phone: string;
  email: string;
  localization: string;
  language: string[];
  user_id: string;
}
