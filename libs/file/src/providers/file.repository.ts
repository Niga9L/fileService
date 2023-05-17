import { FileAggregate, IFile } from '../domain';
import { PaginationDto } from '@lib/shared/dto';

export abstract class FileRepository {
  abstract save(post: IFile): Promise<FileAggregate>;
  abstract findOne(id: string): Promise<FileAggregate | null>;
  abstract findAll(
    pagination: PaginationDto,
  ): Promise<[[FileAggregate], number]>;
  // abstract delete(id: string): Promise<boolean>;
}
