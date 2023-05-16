import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

export const FILE_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [];
