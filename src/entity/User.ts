import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import {Booking} from "./Booking.js";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: "int" })
    uid: number

    @Column({ type: "varchar", length: 255 })
    email: string

    @Column({ type: "varchar", length: 255 })
    password_hash: string

    @Column({ type: "varchar", length: 255 })
    name: string

    @Column({ type: "varchar", length: 30 })
    phone: string

    @Column({ type: "varchar", length: 100 })
    gender: string

    @Column({ type: "varchar", length: 100 })
    home_planet: string

    @Column({ type: "varchar", length: 100 })
    spacepass_no: string

    @Column({ type: "date" })
    dob: string

    @OneToMany(() => Booking, booking => booking.user)
    bookings: Booking[];

    constructor(email: string, password_hash: string, name: string, phone: string, gender: string, home_planet: string, spacepass_no: string, dob: string) {
        this.email = email;
        this.password_hash = password_hash;
        this.name = name;
        this.phone = phone;
        this.gender = gender;
        this.home_planet = home_planet;
        this.spacepass_no = spacepass_no;
        this.dob = dob;
    }
}
