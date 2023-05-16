import { IFile } from '@libs/file';

export type CreateFileDto = Pick<IFile, 'name' | 'link' | 'userId'>;
