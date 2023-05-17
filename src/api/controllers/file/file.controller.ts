import { Body, Controller, Post } from '@nestjs/common';
import { FileFacade } from '@libs/file/application-services';
import { CreateFileDto } from './dto';

@Controller('file')
export class FileController {
  constructor(private readonly fileFacade: FileFacade) {}

  @Post()
  createFile(@Body() createFileDto: CreateFileDto) {
    return this.fileFacade.commands.createFile(createFileDto);
  }
}
