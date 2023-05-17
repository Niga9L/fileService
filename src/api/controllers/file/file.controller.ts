import { Controller } from '@nestjs/common';
import { FileFacade } from '@libs/file/application-services';

@Controller('file')
export class FileController {
  constructor(private readonly fileFacade: FileFacade) {}
}
