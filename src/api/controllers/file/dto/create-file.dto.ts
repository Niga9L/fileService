import { CreateFileDto as ICreateFileDto } from '@libs/file/application-services/commands/dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFileDto implements ICreateFileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsUUID()
  userId: string;
}
