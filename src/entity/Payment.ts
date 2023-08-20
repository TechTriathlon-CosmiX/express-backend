import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Booking } from './Booking.js';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  paymentId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  paymentAmount: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  paymentStatus: string;

  @OneToOne(() => Booking)
  @JoinColumn()
  booking: Booking;

  constructor(paymentAmount: number, paymentStatus: string) {
    this.paymentAmount = paymentAmount;
    this.paymentStatus = paymentStatus;
  }
}
