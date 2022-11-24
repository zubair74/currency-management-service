import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel, Model, QueryResponse } from 'nestjs-dynamoose';
import { User } from 'src/common/interface/user.interface';
import { TransactionDTO } from './dto/transaction.dto';
import { UserCredit } from './interface/user-credit.interface';

@Injectable()
export class TransactionsService {

    constructor(
        @InjectModel('UserCredit')
        private userCreditModel: Model<UserCredit, number>,
    ) {}

    async debit(transactionDTO: TransactionDTO): Promise<void> {

        if(transactionDTO.amount <= 0){
            throw new HttpException("Amount should be greater than 0", HttpStatus.BAD_REQUEST);
        }
        
        const userCredit = await this.userCreditModel.get(transactionDTO.userId)


        if(!userCredit || userCredit.balance < transactionDTO.amount){
            throw new HttpException("Insufficient balance", HttpStatus.BAD_REQUEST);
        }

        const newBalance = userCredit.balance - transactionDTO.amount
        await this.userCreditModel.update(userCredit.userId, {"balance": newBalance}); 
        return;
        
    } 

    async credit(transactionDTO: TransactionDTO): Promise<void> {
        
        if(transactionDTO.amount <= 0){
            throw new HttpException("Amount should be greater than 0", HttpStatus.BAD_REQUEST);
        }

        const userCredit = await this.userCreditModel.get(transactionDTO.userId)

        if(userCredit) {
            const newBalance = userCredit.balance + transactionDTO.amount;
            await this.userCreditModel.update(userCredit.userId,{"balance": newBalance}); 
            return;
        }
        
        await this.userCreditModel.create({userId: transactionDTO.userId, balance: transactionDTO.amount}) 
    } 

}
