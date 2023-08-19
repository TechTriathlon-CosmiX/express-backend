import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Passenger {

    @PrimaryGeneratedColumn({ type: "int" })
    user_id: number

    @Column({ type: "varchar", length: 255 })
    name: string

    @Column({ type: "varchar", length: 30 })
    phone: string

    @Column({ type: "varchar", length: 100 })
    gender: string

    @Column({ type: "varchar", length: 100 })
    home_planet: string

    @Column({ type: "varchar", length: 100 })
    home_country: string

    @Column({ type: "varchar", length: 100 })
    spacepass_no: string

    @Column({ type: "date" })
    dob: string

    constructor(name: string, phone: string, gender: string, home_planet: string, home_country: string, spacepass_no: string, dob: string) {
        this.name = name
        this.phone = phone
        this.gender = gender
        this.home_planet = home_planet
        this.home_country = home_country
        this.spacepass_no = spacepass_no
        this.dob = dob
    } 
}