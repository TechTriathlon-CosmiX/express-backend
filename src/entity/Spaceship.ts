import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from "typeorm"

@Entity()
export class Spaceship {

    @PrimaryGeneratedColumn({ type: "int" })
    spaceship_id: number

    @Column({ type: "varchar", length: 255 })
    name: string

    @Column({ type: "int" })
    passenger_count: number

    @Column({ type: "int" })
    cabin_count: number

    @Column({ type: "varchar",length: 255 })
    image: string

    @Column({ type: "varchar",length: 255 })
    facilities: string
  


    constructor(name: string,passenger_count:number,cabin_count:number,image:string ,facilities: string) {
        this.name = name
        this.passenger_count = passenger_count
        this.cabin_count = cabin_count
     this.image = image
        this.facilities = facilities

   
    }
}