import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFileCommand } from '@libs/file/application-services/commands/create-file/create-file.command';
import { FileAggregate } from '@libs/file';
import { FileRepository } from '@libs/file/providers';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreateFileCommand)
export class CreateFileCommandHandler
  implements ICommandHandler<CreateFileCommand, FileAggregate>
{
  constructor(private readonly _fileRepository: FileRepository) {}
  async execute({ file }: CreateFileCommand): Promise<FileAggregate> {
    const fileAggregate = FileAggregate.create(file);
    const createFile = await this._fileRepository
      .save(fileAggregate)
      .catch((err) => {
        throw new BadRequestException(err);
      });

    return createFile;
  }
}
