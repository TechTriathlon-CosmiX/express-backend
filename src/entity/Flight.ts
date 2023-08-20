import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Spaceport } from './Spaceport.js';
import { FlightClass } from "./FlightClass.js";
import { Booking } from "./Booking.js";
import { Spaceship } from './Spaceship.js'; // Import the Spaceship entity

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', nullable: false })
  arrivalTime: Date;

  @Column({ type: 'datetime', nullable: false })
  departureTime: Date;

  @Column({ type: 'varchar', nullable: false })
  flightStatus: string;

  @Column({ type: 'int', nullable: false })
  freeCabinCount: number;

  @ManyToOne(() => Spaceport, spaceport => spaceport.arrivalFlights)
  arrivalSpaceport: Spaceport;

  @ManyToOne(() => Spaceport, spaceport => spaceport.departureFlights)
  departureSpaceport: Spaceport;

  @OneToOne(() => Spaceship) // Add this relationship
  spaceship: Spaceship;

  @OneToMany(() => FlightClass, flightClass => flightClass.flight)
  flightClasses: FlightClass[];

  @OneToMany(() => Booking, booking => booking.flight)
  bookings: Booking[];

  constructor(arrivalTime: Date, departureTime: Date, flightStatus: string, freeCabinCount: number, arrivalSpaceport: Spaceport, departureSpaceport: Spaceport, flightClasses: FlightClass[], bookings: Booking[], spaceship: Spaceship) {
    this.arrivalTime = arrivalTime;
    this.departureTime = departureTime;
    this.flightStatus = flightStatus;
    this.freeCabinCount = freeCabinCount;
    this.arrivalSpaceport = arrivalSpaceport;
    this.departureSpaceport = departureSpaceport;
    this.flightClasses = flightClasses;
    this.bookings = bookings;
    this.spaceship = spaceship;
  }
}
