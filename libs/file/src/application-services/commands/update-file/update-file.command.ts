import { UpdateFileDto } from '../dto';

export class UpdateFileCommand {
  constructor(public readonly file: UpdateFileDto) {}
}
