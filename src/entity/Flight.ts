import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany } from "typeorm"
import { Spaceport } from "./Spaceport.js";
import { FlightClass } from "./FlightClass.js";

@Entity()
export class Flight {

    @PrimaryGeneratedColumn()
    flightId: number

    @Column()
    arrivalTime: Date

    @Column()
    departureTime: Date

    @Column()
    flightStatus: string

    @Column()
    freeCabinCount: number; 

    spaceport: Spaceport; 

    @ManyToMany(() => FlightClass, flightclass => flightclass.flight) 
    @JoinColumn()
    

    @Column({ nullable: true })
    spaceportId: number; 
    flightclass: any;

    constructor(arrivalTime: Date, departureTime: Date, flightStatus: string, freeCabinCount: number, spaceportId: number) {

        this.arrivalTime = arrivalTime
        this.departureTime = departureTime
        this.flightStatus = flightStatus
        this.freeCabinCount = freeCabinCount
        this.spaceportId = spaceportId
    }
}
