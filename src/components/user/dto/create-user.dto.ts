import { IsArray, IsEmail, IsInt, IsString, } from "class-validator";


export class CreateUserDto {
    @IsString()
    name : string
    
    @IsEmail()
    email : string

    @IsString()
    firebase_uid : string

    @IsString()
    location : string

    @IsInt()
    age : number

    @IsString()
    bio : string

    @IsString()
    distance : string

    @IsString()
    education : string

    @IsString()
    gender : string

    @IsString()
    height : string

    @IsString()
    hobbies : string

    @IsString()
    interest : string

    @IsString()
    languages : string

    @IsString()
    lifestyle : string

    @IsString()
    occupation : string

    @IsInt()
    phone : string

    @IsArray()
    photos : string[]
}
