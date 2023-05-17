import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { GetFileQueryHandler } from './get-file/get-file.query-handler';
import { GetFilesQueryHandler } from './get-files/get-files.query-handler';

export const FILE_QUERIES_HANDLERS: Type<IQueryHandler>[] = [
  GetFileQueryHandler,
  GetFilesQueryHandler,
];
