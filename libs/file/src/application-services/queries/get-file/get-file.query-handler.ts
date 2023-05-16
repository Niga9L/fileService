import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFileQuery } from '@libs/file/application-services/queries/get-file/get-file.query';
import { FileAggregate } from '@libs/file';
import { FileRepository } from '@libs/file/providers';
import { Logger } from '@nestjs/common';

@QueryHandler(GetFileQuery)
export class GetFileQueryHandler
  implements IQueryHandler<GetFileQuery, FileAggregate>
{
  private readonly logger = new Logger(GetFileQueryHandler.name);
  constructor(private readonly _fileRepository: FileRepository) {}
  async execute({ id }: GetFileQuery): Promise<FileAggregate> {
    const existFile = await this._fileRepository.findOne(id).catch((err) => {
      this.logger.error(err);
      return null as FileAggregate;
    });
    return existFile;
  }
}
