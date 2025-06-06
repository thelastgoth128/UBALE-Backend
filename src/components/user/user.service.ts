import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { response } from 'express';

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
    
    return response.status(200).json({
      message : "Successfully created user"
    })
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
