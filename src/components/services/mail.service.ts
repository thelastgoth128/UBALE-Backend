import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailService{
    private transporter: nodemailer.Transporter

    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASSWORD
            }
        })
    }

    async sendOTPMail(to: string,otp: string) {
        const resetLink = `http://localhost:300/reset-password?token=${otp}`
        const mailOptions = {
            from: 'Ubale',
            to: toString,
            subject: 'Password Reset Request',
            html: `
            <div> style="font-family: Aerial, sans-serif; line-height: 1.6; color #333;">
                <h2>Password Reset Request</h2>
                <p>Click the link below to reset your password:</p>
                <a href="${resetLink}">Reset Password</a>
                <p>If you did not request this, please ignore this email.</p>
            </div>`
        }
        await this.transporter.sendMail(mailOptions)
    }
}