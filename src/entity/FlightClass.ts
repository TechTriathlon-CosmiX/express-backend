import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, Double, OneToMany } from "typeorm"
import { Flight } from "./Flight";

@Entity()
export class FlightClass {

    @PrimaryGeneratedColumn()
    classId: number

    @Column()
    className: string

    @Column()
    basefare: Number

    flight: any;

    @ManyToMany(() => Flight, (flight: { flightclass: any; }) => flight.flightclass) 
    @JoinColumn()    

    constructor(className: string, basefare: Number) {
        this.className = className
        this.basefare = basefare
    }
}
