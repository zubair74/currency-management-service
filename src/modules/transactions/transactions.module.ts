import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { DynamooseModule } from 'nestjs-dynamoose';
import { UserCreditSchema } from './schema/user-credit.schema';

@Module({
  imports: [DynamooseModule.forFeature([{name: 'UserCredit', schema: UserCreditSchema}])],
  providers: [TransactionsService],
  controllers: [TransactionsController]
})
export class TransactionsModule {}
