import { FileAggregate, IFile } from '../domain';

export abstract class FileRepository {
  abstract save(post: IFile): Promise<FileAggregate>;
  abstract findOne(id: string): Promise<FileAggregate | null>;
  abstract findAll(): Promise<[[FileAggregate], number]>;
  abstract delete(id: string): Promise<boolean>;
}
