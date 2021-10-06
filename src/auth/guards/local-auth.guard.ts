import {  ExecutionContext, Injectable,HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    // canActivate(context: ExecutionContext) {
    //     return super.canActivate(context);
    //   }
    
    //   handleRequest(err, user, info) {
    //     if (err || !user) {
    //       throw err || new HttpException({status: 400, ...info}, 400);
    //     }
    //     return user;
    //   }
     

}


