import { IFiles } from './file.interface';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { AggregateRoot } from '@nestjs/cqrs';

export class FileAggregate extends AggregateRoot implements IFiles {
  id: string = randomStringGenerator();
  name: string;
  link: string;
  published = false;
  userId: string;
  createdAt = new Date().toISOString();
  updatedAt = new Date().toISOString();

  private constructor() {
    super();
  }

  static create(file: Partial<IFiles>) {
    const _file = new FileAggregate();
    Object.assign(_file, file);
    return _file;
  }
}
