import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Passenger } from "./Passenger";

@Entity()
export class User {

    @PrimaryGeneratedColumn({ type: "int" })
    uid: number

    @Column({ type: "varchar", length: 255 })
    email: string

    @Column({ type: "varchar", length: 255 })
    password_hash: string

    constructor(email: string, password_hash: string) {
        this.email = email
        this.password_hash = password_hash
    }
}
