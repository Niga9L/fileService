import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { CreateFileDto, UpdateFileDto } from './commands/dto';
import { CreateFileCommand } from '@libs/file/application-services/commands/create-file/create-file.command';
import { CreateFileCommandHandler } from '@libs/file/application-services/commands/create-file/create-file.command-handler';
import { UpdateFileCommand } from '@libs/file/application-services/commands/update-file/update-file.command';
import { UpdateFileCommandHandler } from '@libs/file/application-services/commands/update-file/update-file.command-handler';
import { DeleteFileCommand } from '@libs/file/application-services/commands/delete-file/delete-file.command';
import { DeleteFileCommandHandler } from '@libs/file/application-services/commands/delete-file/delete-file.command-handler';
import { GetFilesQuery } from '@libs/file/application-services/queries/get-files/get-files.query';
import { GetFileQuery } from '@libs/file/application-services/queries/get-file/get-file.query';
import { PaginationDto } from '@lib/shared/dto';
import { GetFilesQueryHandler } from '@libs/file/application-services/queries/get-files/get-files.query-handler';
import { GetFileQueryHandler } from '@libs/file/application-services/queries/get-file/get-file.query-handler';

@Injectable()
export class FileFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  commands = {
    createFile: (file: CreateFileDto) => this.createFile(file),
    updateFile: (file: UpdateFileDto) => this.updateFile(file),
    deleteFile: (id: string) => this.deleteFile(id),
  };
  queries = {
    getOneFile: (id: string) => this.getFile(id),
    getAllFile: (pagination: PaginationDto) => this.getFiles(pagination),
  };
  events = {};

  private createFile(file: CreateFileDto) {
    return this.commandBus.execute<
      CreateFileCommand,
      CreateFileCommandHandler['execute']
    >(new CreateFileCommand(file));
  }
  private updateFile(file: UpdateFileDto) {
    return this.commandBus.execute<
      UpdateFileCommand,
      UpdateFileCommandHandler['execute']
    >(new UpdateFileCommand(file));
  }
  private deleteFile(id: string) {
    return this.commandBus.execute<
      DeleteFileCommand,
      DeleteFileCommandHandler['execute']
    >(new DeleteFileCommand(id));
  }

  private getFile(id: string) {
    return this.queryBus.execute<GetFileQuery, GetFileQueryHandler['execute']>(
      new GetFileQuery(id),
    );
  }
  private getFiles(pagination: PaginationDto) {
    return this.queryBus.execute<
      GetFilesQuery,
      GetFilesQueryHandler['execute']
    >(new GetFilesQuery(pagination));
  }
}
