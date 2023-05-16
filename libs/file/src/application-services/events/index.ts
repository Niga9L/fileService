import { Type } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';

export const FILE_EVENTS_HANDLERS: Type<IEventHandler>[] = [];
