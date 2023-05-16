import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('files')
export class FilesEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  link: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'updated_at' })
  updatedAt: string;

  @Column({ name: 'deleted_at' })
  deletedAt: string;
}
