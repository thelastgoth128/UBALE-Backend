import { IsArray, IsEmail, IsInt, IsString, IsStrongPassword } from "class-validator";


export class CreateUserDto {
    @IsString()
    name : string
    
    @IsEmail()
    email : string

    @IsStrongPassword()
    password : string

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
    phone : number

    @IsArray()
    photos : string[]
}
