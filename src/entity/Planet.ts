import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Spaceport } from "./Spaceport.js";

@Entity()
export class Planet {

    @PrimaryGeneratedColumn()
    planetId: number

    @Column()
    planetName: string

    @Column("blob") 
    image: Buffer;

    @Column()
    description: string

    @OneToOne(() => Spaceport, spaceport => spaceport.planet) 
    @JoinColumn()
    spaceport: Spaceport; 

    @Column({ nullable: true })
    spaceportId: number; 

    constructor(planetName: string, image: Buffer, description: string) {

        this.planetName = planetName
        this.image = image
        this.description = description
    }
}
