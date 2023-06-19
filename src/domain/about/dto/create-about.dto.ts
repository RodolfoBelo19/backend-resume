export class CreateAboutDto {
  readonly description_pt: string;
  readonly description_en: string;
  readonly age: number;
  readonly phone: string;
  readonly email: string;
  readonly localization: string;
  readonly language: string[];
  readonly user_id: string;
}
