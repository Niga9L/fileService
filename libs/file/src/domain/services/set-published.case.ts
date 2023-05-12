import { IFile } from '@libs/file';

export interface ISetPublishedCase {
  setPublished(): void;
}

export const SET_PUBLISHED = async function (this: IFile) {
  this.published = true;
};
