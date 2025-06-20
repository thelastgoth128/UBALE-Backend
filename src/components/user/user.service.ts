import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { response } from 'express';
import { FirebaseService } from '../services/firebase.service';
import * as admin from 'firebase-admin'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userrep : Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {
    const {phone, name, email, ...userData } = createUserDto;

    const exists = await this.userrep.findOne({where : {phone}})
    if (exists) {
      throw new ForbiddenException('phone already exists, please login')
    }
    const firebaseUser = await admin.auth().createUser({
      phoneNumber: phone,
      email: email,
      displayName: name,
    })

    const user = await this.userrep.save({
      ...userData,
      phone,
      name,
      email,
      firebase_uid : firebaseUser.uid
    })

    return {
      statusCode:200,
      message:"Successfully created user",
      user,
    }
  }

  findAll() {
    return this.userrep.find({select: [
      'userid','email','location','distance','age','bio','education','gender','height','hobbies','interest','languages','lifesytle','name','occupation','phone'
    ]});
  }

  async findOne(id: number) {
    return await this.userrep.findOne({where: {userid:id}});
  }

  async findNumber(phone : string) {
    return await this.userrep.findOne({where: {phone}})
  }

  async findMail(email :string) {
    return await this.userrep.findOne({where: {email}})
  }

  async update(userid: number, updateUserDto: UpdateUserDto) {
    const user = await this.userrep.findOne({where: {userid}})

    if (!user) {
      throw new NotFoundException('user not found')
    }
    Object.assign(user,updateUserDto)

    return await this.userrep.save(user);
  }

  async remove(userid: number) {
    try {
      const user = await this.userrep.findOne({where: {userid}})

      if (!user) {
        throw new NotFoundException('User not found')
      }

      await this.userrep.delete(user)

      return {
        statusCode: 200,
        message:'Successfully deleted Account',

      }
    }catch(error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message
      }
    }
  }
}
