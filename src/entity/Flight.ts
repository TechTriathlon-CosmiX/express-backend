import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Spaceport } from "./Spaceport.js";

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

    @OneToOne(() => Spaceport, spaceport => spaceport.planet) 
    @JoinColumn()
    spaceport: Spaceport; 

    @Column({ nullable: true })
    spaceportId: number; 

    constructor(arrivalTime: Date, departureTime: Date, flightStatus: string, freeCabinCount: number, spaceportId: number) {

        this.arrivalTime = arrivalTime
        this.departureTime = departureTime
        this.flightStatus = flightStatus
        this.freeCabinCount = freeCabinCount
        this.spaceportId = spaceportId
    }
}
