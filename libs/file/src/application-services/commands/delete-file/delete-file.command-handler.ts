import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FileAggregate } from '@libs/file';
import { FileRepository } from '@libs/file/providers';
import { BadRequestException, Logger } from '@nestjs/common';
import { DeleteFileCommand } from '@libs/file/application-services/commands/delete-file/delete-file.command';

@CommandHandler(DeleteFileCommand)
export class DeleteFileCommandHandler
  implements ICommandHandler<DeleteFileCommand, boolean>
{
  private readonly logger = new Logger(DeleteFileCommandHandler.name);
  constructor(private readonly _fileRepository: FileRepository) {}
  async execute({ id }: DeleteFileCommand): Promise<boolean> {
    const existFile = await this._fileRepository.findOne(id).catch((err) => {
      this.logger.error(err);
      return null as FileAggregate;
    });
    if (!existFile) {
      throw new BadRequestException(`Файл по id: ${id} - не найден`);
    }
    const fileAggregate = FileAggregate.delete(existFile);
    await this._fileRepository.save(fileAggregate);
    return true;
  }
}
