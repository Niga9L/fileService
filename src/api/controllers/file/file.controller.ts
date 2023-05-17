import { Body, Controller, Post } from '@nestjs/common';
import { FileFacade } from '@libs/file/application-services';
import { CreateFileDto } from './dto';
import { CurrentUser, ICurrentUser } from '@lib/auth';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

@Controller('file')
export class FileController {
  constructor(private readonly fileFacade: FileFacade) {}

  @Post(':id')
  createFile(
    @CurrentUser() user: ICurrentUser,
    @Body() createFileDto: CreateFileDto,
  ) {
    return this.fileFacade.commands.createFile({
      ...createFileDto,
      userId: randomStringGenerator(),
      // userId: user.userId,
    });
  }
}
