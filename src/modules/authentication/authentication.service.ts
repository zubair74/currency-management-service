import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { User, UserKey } from 'src/common/interface/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {


    constructor(
        @InjectModel('Users')
        private userModel: Model<User, UserKey>,
        private jwtTokenService: JwtService
    ) {}

    async validateUserCredentials(username: string, password: string): Promise<any> {

        const user = await this.userModel.query("username").eq(username).exec()

        if (user.count === 1 && user[0].password === password) {
            const {password, ...result} = user[0];
            return result;
        }
        return null;
    }

    async loginWithCredentials(user: any) {
        const payload = {username: user.username, sub: user.id};

        return {
            access_token: this.jwtTokenService.sign(payload),
        };
    }
}
