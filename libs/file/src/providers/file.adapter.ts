import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FileRepository } from '@libs/file/providers/file.repository';
import { PaginationDto } from '@lib/shared/dto';
import { FileAggregate, IFile } from '@libs/file';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesEntity } from '@lib/entities';
import { FindManyOptions, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FileAdapter implements FileRepository {
  private readonly logger = new Logger(FileAdapter.name);

  constructor(
    @InjectRepository(FilesEntity)
    private readonly _fileRepository: Repository<FilesEntity>,
  ) {}

  async findAll(pagination: PaginationDto): Promise<[FileAggregate[], number]> {
    const { limit: take, offset: skip } = plainToInstance(
      PaginationDto,
      pagination,
    );
    const options: FindManyOptions<FilesEntity> = {
      where: {
        deletedAt: '',
      },
      take,
      skip,
      order: {
        createdAt: 'DESC',
      },
    };
    const [data, count] = await this._fileRepository
      .findAndCount(options)
      .catch((err) => {
        this.logger.error(err);
        return [[], 0] as [FilesEntity[], number];
      });

    return [data.map((node) => FileAggregate.create(node)), count];
  }

  async findOne(id: string): Promise<FileAggregate | null> {
    const fileExist = await this._fileRepository
      .findOneBy({ id })
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    if (!fileExist) {
      throw new NotFoundException(`Файл с id ${id} не найден`);
    }

    return FileAggregate.create(fileExist);
  }

  async save(file: IFile): Promise<FileAggregate> {
    if (file.id) {
      const existFile = this.findOne(file.id);
      if (!existFile) {
        throw new NotFoundException(`Файл с id ${file.id} не найден`);
      }
      const { id, ...toUpdate } = file;
      await this._fileRepository.update({ id }, toUpdate);
      return await this.findOne(file.id);
    }
    const savedFile = await this._fileRepository.save(file);
    return FileAggregate.create(savedFile);
  }

  async delete(_id: string): Promise<boolean> {
    if (_id) {
      const existFile = await this.findOne(_id);
      if (!existFile) {
        throw new NotFoundException(`Файл с id ${_id} не найден`);
      }
      const { id, ...toUpdate } = FileAggregate.create(existFile);
      try {
        await this._fileRepository.update({ id }, toUpdate);
        return true;
      } catch (err) {
        this.logger.error(err);
        return false;
      }
    }
  }
}
