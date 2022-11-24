import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
// import { JwtStrategy } from './jwt.strategy';
import { DynamooseModule } from 'nestjs-dynamoose';
import { UserSchema } from 'src/common/schema/user.schema';
import { LocalStrategy } from './local.auth';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

require('dotenv').config();


@Module({
  imports:[
    DynamooseModule.forFeature([{name: 'Users', schema: UserSchema}]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '600s'}
    }),
    PassportModule
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy, LocalStrategy]
})
export class AuthenticationModule {}
