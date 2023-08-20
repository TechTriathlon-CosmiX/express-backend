import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Spaceship } from './Spaceship.js';
import { Flight } from './Flight.js';
import { Planet } from './Planet.js';

@Entity()
export class Spaceport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  location: string;

  @OneToMany(() => Spaceship, spaceship => spaceship.spaceline)
  spaceships: Spaceship[];

  @OneToMany(() => Flight, flight => flight.arrivalSpaceport)
  arrivalFlights: Flight[];

  @OneToMany(() => Flight, flight => flight.departureSpaceport)
  departureFlights: Flight[];

  @ManyToOne(() => Planet, planet => planet.spaceports)
  planet: Planet;
}
