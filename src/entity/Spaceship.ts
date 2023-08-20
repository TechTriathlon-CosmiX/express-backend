import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn} from 'typeorm';
import { Spaceline } from './Spaceline.js';
import {Cabin} from "./Cabin.js";
import {Flight} from "./Flight.js";

@Entity()
export class Spaceship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  passengerCount: number;

  @Column({ type: 'int', nullable: false })
  cabinCount: number;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Column({ type: 'text'})
  facilities: string;

  @ManyToOne(() => Spaceline, spaceline => spaceline.spaceships)
  spaceline: Spaceline;

  @OneToMany(() => Cabin, cabin => cabin.spaceship)
  cabins: Cabin[];

  @OneToOne(() => Flight)
  @JoinColumn()
  flight: Flight;
}
