import { IFile } from '@libs/file';

export type UpdateFileDto = Partial<Pick<IFile, 'name' | 'link'>> &
  Pick<IFile, 'id' | 'userId'>;
