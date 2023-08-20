import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn({ type: "int" })
    id: number

    @Column({ type: "int" })
    uid: number

    @Column({ type: "varchar", length: 255 })
    email: string

   @Column({ type: "varchar", length: 255 })
    password_hash: string

  

    constructor(uid: number, email: string, password_hash: string) {
        this.email = email
        this.uid = uid
        this.password_hash = password_hash
        
    }
}
