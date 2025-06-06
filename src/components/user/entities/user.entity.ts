import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userid : number

    @Column()
    name : string

    @Column()
    email : string

    @Column()
    password : string

    @Column()
    location : string

    @Column()
    age : number

    @Column()
    bio : string

    @Column()
    distance : string

    @Column()
    education : string

    @Column()
    gender : string

    @Column()
    height : string

    @Column()
    hobbies : string

    @Column()
    languages : string

    @Column()
    interest : string

    @Column()
    lifesytle : string

    @Column()
    occupation : string

    @Column()
    phone : number

    @Column()
    profilepic : string

}
