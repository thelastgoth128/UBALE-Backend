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
import { MailService } from '../services/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userrep : Repository<User>,
    private userService : UserService,
    private mailService : MailService
  ){}

  async signIn(phone : string, pass: string) {
    try{
      const user = await this.userService.findNumber(phone)

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

  async forgotPassword(email: string) {
    const user = await this.userService.findMail(email)

    if (user) {
      const otp = this.generateOTP()
      this.storeOTP(user.phone,otp)

      await this.mailService.sendOTPMail(email,otp)
    }
    return{
      message: 'if the user exists, they will receive an email'
    }
  }

  async resetPassword(firebaseUid: string, newPassword: string) {
    try {
      await admin.auth().updateUser(firebaseUid, {
        password: newPassword
      });
      return {
        message: 'Password has been successfully reset'
      }
    }catch(error) {
      throw new Error(`Failed to reset password: ${error.message}`)
    }
  }
}

const otpStore = new Map()
