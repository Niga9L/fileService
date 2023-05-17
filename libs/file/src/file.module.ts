import { Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesEntity } from '@lib/entities';
import { FILE_QUERIES_HANDLERS } from '@libs/file/application-services/queries';
import { FILE_EVENTS_HANDLERS } from '@libs/file/application-services/events';
import { FILE_COMMANDS_HANDLERS } from '@libs/file/application-services/commands';
import { FileFacade } from '@libs/file/application-services';
import { fileFacadeFactory, FileRepository } from '@libs/file/providers';
import { FileAdapter } from '@libs/file/providers/file.adapter';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([FilesEntity])],
  providers: [
    ...FILE_QUERIES_HANDLERS,
    ...FILE_EVENTS_HANDLERS,
    ...FILE_COMMANDS_HANDLERS,
    {
      provide: FileFacade,
      inject: [CommandBus, QueryBus, EventBus],
      useFactory: fileFacadeFactory,
    },
    {
      provide: FileRepository,
      useClass: FileAdapter,
    },
  ],
  exports: [FileFacade],
})
export class FileModule implements OnModuleInit {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}
  onModuleInit() {
    this.commandBus.register(FILE_COMMANDS_HANDLERS);
    this.queryBus.register(FILE_QUERIES_HANDLERS);
    this.eventBus.register(FILE_EVENTS_HANDLERS);
  }
}
