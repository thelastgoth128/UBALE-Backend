import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import crypto from 'crypto'
import twilio from 'twilio'
import * as admin from 'firebase-admin'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userrep : Repository<User>,
    private readonly userService : UserService,
  ){}

  async signIn(phone : number, pass: string) {
<<<<<<< HEAD
    try{
      const user = await this.userService.findOne(phone)
=======
    const user = await this.userService.findNumber(phone)
>>>>>>> 6e5a9bf (get methods and patch function)

    if (!user){
      throw new BadRequestException('wrong credentials')
    }
    const firebaseAuth = admin.auth()
    const userRecord = await firebaseAuth.getUserByPhoneNumber(phone.toString())

    if (!userRecord) {
      throw new BadRequestException('wrong credentials')
    }

    const customToken = await firebaseAuth.createCustomToken(userRecord.uid);

    return {
        access_token: customToken,
        data: {
          userid: userRecord.uid,
          phone: userRecord.phoneNumber,
          name: user.name,
          location: user.location,

        }
      } 
    }catch (error) {
      throw new BadRequestException('Authentication failed')
    }
  }

  generateOTP() {
    return crypto.randomInt(100000, 999999).toString()
  }

  async sendOTP(phoneNumber: string) {
    const accountSid = 'Ubale';
    const authToken = 'your_twilio_auth_token';
    const client = twilio(accountSid, authToken);
    const otp = this.generateOTP()
    this.storeOTP(phoneNumber,otp)
  
    try {
      await client.messages.create({
        body: `Your OTP code is ${otp}`,
        from: 'Ubale',
        to: phoneNumber
      })
    }catch (error) {
      console.error("Error sending OTP:", error)
    }
  }

  storeOTP(phoneNumber:string, otp:string) {
    otpStore.set(phoneNumber, otp)
    setTimeout(()=> otpStore.delete(phoneNumber), 300000)
  }

  verifyOTP(phoneNumber: string, enteredOTP: string) {
    const storedOTP = otpStore.get(phoneNumber)
    if (!storedOTP) {
      console.log("No OTP fund for this number")
      return false
    }
    if (storedOTP === enteredOTP) {
      console.log("OTP verified successfully")
      return true;
    }else {
      console.log("Invalid OTP:")
      return false;
    }
  }
 
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

const otpStore = new Map()
