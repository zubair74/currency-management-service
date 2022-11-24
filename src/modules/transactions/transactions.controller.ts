import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { TransactionDTO } from './dto/transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('transaction')
export class TransactionsController {

    constructor(private readonly transactionsService: TransactionsService){}

    @UseGuards(JwtAuthGuard)
    @Post("debit")
    async debit(@Body() transactionDTO: TransactionDTO): Promise<void>{
        await this.transactionsService.debit(transactionDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Post("credit")
    async credit(@Body() transactionDTO: TransactionDTO): Promise<void>{
        await this.transactionsService.credit(transactionDTO);
    }
}
