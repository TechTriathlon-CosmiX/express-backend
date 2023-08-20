import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, ManyToMany, JoinTable} from 'typeorm';
import { Flight } from './Flight.js';
import { User } from './User.js';
import {Cabin} from "./Cabin.js";
import {Payment} from "./Payment.js";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    bookingId: number;

    @Column({ type: 'datetime', nullable: false })
    placedTime: Date;

    @Column({ type: 'int', nullable: false })
    adultCount: number;

    @Column({ type: 'int', nullable: false })
    childCount: number;

    @Column({ type: 'text', nullable: true })
    additionalRemarks: string;

    @Column({ type: 'int', nullable: true })
    additionalLuggageCapacity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, default: 0 })
    additionalLuggageCharge: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    netValue: number;

    @ManyToOne(() => Flight, flight => flight.bookings)
    flight: Flight;

    @ManyToOne(() => User, user => user.bookings)
    user: User;

    @ManyToMany(() => Cabin, cabin => cabin.bookings)
    @JoinTable()
    cabins: Cabin[];

    @OneToOne(() => Payment, payment => payment.booking)
    payment: Payment;

  constructor(placedTime: Date, adultCount: number, childCount: number, additionalRemarks: string, additionalLuggageCapacity: number, additionalLuggageCharge: number, netValue: number, flight: Flight, user: User, cabins: Cabin[], payment: Payment) {
        this.placedTime = placedTime;
        this.adultCount = adultCount;
        this.childCount = childCount;
        this.additionalRemarks = additionalRemarks;
        this.additionalLuggageCapacity = additionalLuggageCapacity;
        this.additionalLuggageCharge = additionalLuggageCharge;
        this.netValue = netValue;
        this.flight = flight;
        this.user = user;
        this.cabins = cabins;
        this.payment = payment;
    }
}
