import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Flight } from './Flight.js';

@Entity()
export class FlightClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  baseFare: number;

  @ManyToOne(() => Flight, flight => flight.flightClasses)
  flight: Flight;
}
