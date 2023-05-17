import { Global, Module } from '@nestjs/common';
import { FileModule } from '@libs/file';

@Global()
@Module({
  imports: [FileModule],
  exports: [FileModule],
})
export class DomainsModule {}
