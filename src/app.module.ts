import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { DynamooseModule } from 'nestjs-dynamoose';
import { AuthenticationModule } from './modules/authentication/authentication.module';


interface DynamooseModuleOptions {
  aws: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
  }
}

const dynamooseModuleOptions: DynamooseModuleOptions = {
  aws: {
    accessKeyId: "",
    secretAccessKey: "",
    region: "us-east-1"
  }
}

@Module({
  imports: [
    DynamooseModule.forRoot(
      {
        aws: {
          accessKeyId: "",
          secretAccessKey: "",
          region: "us-east-1"
        }
      }
    ),
    TransactionsModule,
    AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
