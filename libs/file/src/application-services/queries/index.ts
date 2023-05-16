import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { GetFileQueryHandler } from '@libs/file/application-services/queries/get-file/get-file.query-handler';

export const FILE_QUERIES_HANDLERS: Type<IQueryHandler>[] = [
  GetFileQueryHandler,
];
