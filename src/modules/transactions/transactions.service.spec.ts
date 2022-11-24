import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'nestjs-dynamoose';
import { TransactionDTO } from './dto/transaction.dto';
import { UserCredit, UserCreditKey } from './interface/user-credit.interface';
import { TransactionsService } from './transactions.service';
import { getModelToken } from 'nestjs-dynamoose';
import { UserCreditSchema } from './schema/user-credit.schema';
import { UserSchema } from 'src/common/schema/user.schema';



describe('TransactionsService', () => {
  let service: TransactionsService;
  let repository: Model<UserCredit, UserCreditKey>

  class mockRepository  {
    public async query(): Promise<void> {}
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        { 
          provide: getModelToken('UserCredit'), 
          useValue: mockRepository  
        },      
      ],
  })
  .compile();

    service = module.get<TransactionsService>(TransactionsService);
    repository = module.get(getModelToken('UserCredit'));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('throws error when transaction amount is less than or equal to zero', async () => {
    
    try {
      await service.debit( {userId: 1, amount: 0 });
    } catch (e) {
      expect(e.message).toBe('Amount should be greater than 0');
    }

    try {
      await service.credit( {userId: 1, amount: 0 });
    } catch (e) {
      expect(e.message).toBe('Amount should be greater than 0');
    }
    
  });

});
