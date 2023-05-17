import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFilesQuery } from '@libs/file/application-services/queries/get-files/get-files.query';
import { FileAggregate } from '@libs/file';
import { FileRepository } from '@libs/file/providers';
import { Logger } from '@nestjs/common';

@QueryHandler(GetFilesQuery)
export class GetFilesQueryHandler
  implements IQueryHandler<GetFilesQuery, [[FileAggregate], number]>
{
  private readonly logger = new Logger(GetFilesQueryHandler.name);
  constructor(private readonly _fileRepository: FileRepository) {}
  async execute({
    pagination,
  }: GetFilesQuery): Promise<[[FileAggregate], number]> {
    const [data, count] = await this._fileRepository
      .findAll(pagination)
      .catch((err) => {
        this.logger.error(err);
        return [[], 0];
      });
    return [data, count] as [[FileAggregate], number];
  }
}
