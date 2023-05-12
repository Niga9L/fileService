import { IFile } from '@libs/file';

export interface ISetNotPublishedCase {
  setNotPublished(): void;
}

export const SET_NOT_PUBLISHED = async function (this: IFile) {
  this.published = false;
};
