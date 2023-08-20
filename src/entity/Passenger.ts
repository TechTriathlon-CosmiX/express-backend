import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation, OneToOne, JoinColumn, PrimaryColumn } from "typeorm"
import { Booking } from "./Booking.js"
import { User } from "./User.js"
import { type } from "os"

@Entity()
export class Passenger {

    // @PrimaryGeneratedColumn({ type: "int" })
    // uid: number

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

    @PrimaryColumn({ type: "int" })
    @OneToOne(type => User, user => user.uid,)
    @JoinColumn({ name: "uid" })
    user: User;

    @OneToMany(() => Booking, (booking) => booking.passenger)
    bookings: Relation<Booking>[]

    constructor(user: User, name: string, phone: string, gender: string, home_planet: string, home_country: string, spacepass_no: string, dob: string) {
        this.user = user
        this.name = name
        this.phone = phone
        this.gender = gender
        this.home_planet = home_planet
        this.home_country = home_country
        this.spacepass_no = spacepass_no
        this.dob = dob
    }
}