import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { FileFacade } from '@libs/file/application-services';

export const fileFacadeFactory = (
  commandBus: CommandBus,
  queryBus: QueryBus,
  eventBus: EventBus,
) => new FileFacade(commandBus, queryBus, eventBus);
