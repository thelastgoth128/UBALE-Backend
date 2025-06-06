import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { FirebaseService } from "src/components/services/firebase.service";
import { IS_PUBLIC_KEY } from "./public";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly firebaseService: FirebaseService,
        private reflector: Reflector,
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY,[
            context.getHandler(),
            context.getClass()
        ])

        if (isPublic) {
            return true
        }

        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split('')[1];

        if (!token) {
            return false;
        }
        try {
            request.user = await this.firebaseService.verifyToken(token);
            return true;
        }catch (error) {
            return false;
        }
    }
}