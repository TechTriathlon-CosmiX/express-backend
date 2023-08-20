import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation } from "typeorm"
import { Passenger } from "./Passenger.js"

@Entity()
export class Booking {

    @PrimaryGeneratedColumn({ type: "int" })
    booking_id: number

    @Column({ type: "datetime" })
    placed_time: string

    @Column({ type: "int" })
    adult_count: number

    @Column({ type: "int" })
    child_count: number

    @Column({ type: "text", nullable: true })
    additional_remarks: string

    @Column({ type: "int", nullable: true })
    additional_luggage_capacity: number

    @Column({ type: "decimal", precision: 4, scale: 2, default: 0 })
    additional_luggage_charge: number

    @Column({ type: "decimal", precision: 10, scale: 2 })
    net_value: number

    @ManyToOne(() => Passenger, (passenger) => passenger.bookings)
    @JoinColumn({ name: "user_id" })
    passenger: Relation<Passenger>   

    constructor(
        placed_time: string,
        adult_count: number,
        child_count: number,
        additional_remarks: string,
        additional_luggage_capacity: number,
        additional_luggage_charge: number,
        net_value: number,
        passenger: Relation<Passenger>
    ) {
        this.placed_time = placed_time;
        this.adult_count = adult_count;
        this.child_count = child_count;
        this.additional_remarks = additional_remarks;
        this.additional_luggage_capacity = additional_luggage_capacity;
        this.additional_luggage_charge = additional_luggage_charge;
        this.net_value = net_value;
        this.passenger = passenger;
    }
}