import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from "typeorm"
import { Booking } from "./Booking.js"

@Entity()
export class Spaceline {

    @PrimaryGeneratedColumn({ type: "int" })
    spaceline_id: number

    @Column({ type: "varchar", length: 255 })
    name: string

    @Column({ type: "varchar", length: 30 })
    logo: string

  


    constructor(name: string, logo: string) {
        this.name = name
        this.logo = logo
   
    }
}