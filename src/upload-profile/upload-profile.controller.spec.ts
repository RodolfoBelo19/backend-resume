import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UploadProfileController } from './upload-profile.controller';
import { Image } from './image.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

class ImageModelMock {
  constructor(private readonly data: any) {}

  static findOne() {
    return {
      exec: jest.fn().mockResolvedValue(null),
    };
  }

  save() {
    return Promise.resolve(this.data);
  }

  static create(data: any) {
    return new ImageModelMock(data);
  }
}

describe('UploadProfileController', () => {
  let app: INestApplication;
  let imageModel: Model<Image>;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UploadProfileController],
      providers: [
        {
          provide: getModelToken(Image.name),
          useValue: new ImageModelMock({}),
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    imageModel = moduleRef.get<Model<Image>>(getModelToken(Image.name));
  });

  afterAll(async () => {
    await app.close();
  });

  describe('uploadImage', () => {
    it('should upload an image successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/upload-profile/image')
        .attach('image', './test/image.jpg')
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual({
        imageUrl: expect.stringContaining('/upload-profile/image/'),
      });
      expect(imageModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          filename: expect.any(String),
          path: expect.any(String),
          contentType: 'image/jpeg',
        }),
      );
      expect(imageModel).toHaveBeenCalled();
    });
  });
});
