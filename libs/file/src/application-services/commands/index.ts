import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { CreateFileCommandHandler } from '../commands/create-file/create-file.command-handler';
import { UpdateFileCommandHandler } from '../commands/update-file/update-file.command-handler';

export const FILE_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [
  CreateFileCommandHandler,
  UpdateFileCommandHandler,
];
