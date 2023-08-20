import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinColumn } from "typeorm"
import { Planet } from "./Planet.js";
import { Flight } from "./Flight.js";

@Entity()
export class Spaceport {

    @PrimaryGeneratedColumn()
    spaceportId: number

    @Column()
    spaceportName: string

    @Column()
    location: string

    planet: any

    @OneToMany(() => Planet, planet => planet.spaceport) 
    planets: Planet[]; 

    @ManyToMany(() => Flight, flight => flight.spaceport) 
    @JoinColumn()
    flight: any;

    constructor(spaceportName: string,  location: string) {

        this.spaceportName = spaceportName
        this.location = location
    }
}
