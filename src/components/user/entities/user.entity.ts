import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userid : number

    @Column()
    name : string

    @Column({
        nullable:true
    })
    email : string

    @Column({
        nullable:true
    })
    firebase_uid : string

    @Column({
        nullable:true
    })
    location : string

    @Column({
        nullable:true
    })
    age : number

    @Column({
        nullable:true
    })
    bio : string

    @Column({
        nullable:true
    })
    distance : string

    @Column({
        nullable:true
    })
    education : string

    @Column({
        nullable:true
    })
    gender : string

    @Column({
        nullable:true
    })
    height : string

    @Column({
        nullable:true
    })
    hobbies : string

    @Column({
        nullable:true
    })
    languages : string

    @Column({
        nullable:true
    })
    interest : string

    @Column({
        nullable:true
    })
    lifesytle : string

    @Column({
        nullable:true
    })
    occupation : string

    @Column({
        nullable:true
    })
    phone : string

    @Column({
        nullable:true
    })
    profilepic : string

}
