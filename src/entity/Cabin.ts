import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Spaceship } from './Spaceship.js';
import { Booking } from './Booking.js';

@Entity()
export class Cabin {
  @PrimaryGeneratedColumn()
  cabinNo: number;

  @Column({ type: 'int', nullable: false })
  passengerCount: number;

  @ManyToOne(() => Spaceship, spaceship => spaceship.cabins)
  spaceship: Spaceship;

  @ManyToMany(() => Booking, booking => booking.cabins)
  @JoinTable()
  bookings: Booking[];

  constructor(passengerCount: number, spaceship: Spaceship, bookings: Booking[]) {
    this.passengerCount = passengerCount;
    this.spaceship = spaceship;
    this.bookings = bookings;
  }
}
