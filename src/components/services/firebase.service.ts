import * as admin from 'firebase-admin'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FirebaseService {
    constructor(){
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY,
            })
        })
    }

    async verifyToken(token: string) {
        try {
            return await admin.auth().verifyIdToken(token);
        }catch (error){
            throw new Error('Invalid or expired token')
        }
    }
}