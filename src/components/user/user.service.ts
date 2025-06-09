import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { response } from 'express';
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userrep : Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {
    const {phone, name } = createUserDto;

    const exists = await this.userrep.findOne({where : {phone}})
    if (exists) {
      throw new ForbiddenException('phone already exists, please login')
    }
    const user = await this.userrep.save(createUserDto);

    return {
      statusCode:200,
      message:"Successfully created user",
      user,
    }
  }

  findAll() {
    return this.userrep.find();
  }

  async findOne(id: number) {
    return await this.userrep.findOne({where: {phone:id}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
