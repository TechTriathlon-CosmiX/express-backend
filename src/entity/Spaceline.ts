import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Spaceship } from './Spaceship.js';

@Entity()
export class Spaceline {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  logo: string;

  @OneToMany(() => Spaceship, spaceship => spaceship.spaceline)
  spaceships: Spaceship[];
}
