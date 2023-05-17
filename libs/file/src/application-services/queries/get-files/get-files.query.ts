import { PaginationDto } from '@lib/shared/dto';

export class GetFilesQuery {
  constructor(public readonly pagination: PaginationDto) {}
}
