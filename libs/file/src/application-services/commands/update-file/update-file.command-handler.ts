import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateFileCommand } from '@libs/file/application-services/commands/update-file/update-file.command';
import { FileAggregate } from '@libs/file';
import { FileRepository } from '@libs/file/providers';
import { BadRequestException, Logger } from '@nestjs/common';

@CommandHandler(UpdateFileCommand)
export class UpdateFileCommandHandler
  implements ICommandHandler<UpdateFileCommand, FileAggregate>
{
  private readonly logger = new Logger(UpdateFileCommandHandler.name);
  constructor(private readonly _fileRepository: FileRepository) {}
  async execute({ file }: UpdateFileCommand): Promise<FileAggregate> {
    const existFile = await this._fileRepository
      .findOne(file.id)
      .catch((err) => {
        this.logger.error(err);
        return null as FileAggregate;
      });
    if (!existFile) {
      throw new BadRequestException(`Файл по id: ${file.id} - не найден`);
    }
    Object.assign(existFile, file);
    const fileAggregate = FileAggregate.create(existFile);
    await this._fileRepository.save(fileAggregate);
    return fileAggregate;
  }
}
