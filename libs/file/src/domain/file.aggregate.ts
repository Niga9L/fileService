import { IFile } from './file.interface';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { FileServices } from './services';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  validateSync,
} from 'class-validator';
import { Exclude } from 'class-transformer';

export class FileAggregate extends FileServices implements IFile {
  @IsUUID()
  id: string = randomStringGenerator();

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsBoolean()
  @Exclude()
  published = false;

  @IsUUID()
  userId: string;

  @IsString()
  createdAt = new Date().toISOString();

  @IsString()
  updatedAt = new Date().toISOString();

  private constructor() {
    super();
  }

  static async create(file: Partial<IFile>) {
    const _file = new FileAggregate();
    await _file.setNotPublished();
    Object.assign(_file, file);
    _file.updatedAt = file?.id ? new Date().toISOString() : _file.updatedAt;
    const errors = validateSync(_file, { whitelist: true });
    if (errors.length) {
      throw new Error('Post not valid');
    }
    return _file;
  }
}
