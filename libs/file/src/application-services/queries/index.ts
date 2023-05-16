import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';

export const FILE_QUERIES_HANDLERS: Type<IQueryHandler>[] = [];
