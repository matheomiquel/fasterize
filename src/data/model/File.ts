import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { FileFormat } from '../../domain/model'
@Entity({ name: 'file' })
export class FileProvider {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ nullable: true })
  path: string;
  @Column()
  extension: FileFormat
  @Column()
  name: string;
  @Column({ nullable: true })
  url: string;
}