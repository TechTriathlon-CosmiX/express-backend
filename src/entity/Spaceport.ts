import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Planet } from "./Planet.js";

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

    constructor(spaceportName: string,  location: string, planets: Planet[]) {

        this.spaceportName = spaceportName
        this.location = location
        this.planets = planets
    }
}
