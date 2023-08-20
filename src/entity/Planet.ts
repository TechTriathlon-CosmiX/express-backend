import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Spaceport} from "./Spaceport.js";

@Entity()
export class Planet {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @OneToMany(() => Spaceport, spaceport => spaceport.planet)
  spaceports: Spaceport[];
}
