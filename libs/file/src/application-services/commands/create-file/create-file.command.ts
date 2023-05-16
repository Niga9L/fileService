import { CreateFileDto } from '../dto';

export class CreateFileCommand {
  constructor(public readonly file: CreateFileDto) {}
}
