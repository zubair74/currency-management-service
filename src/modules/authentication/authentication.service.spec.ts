import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-dynamoose';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  class mockRepository {
    public create(): void {}
    public async save(): Promise<void> {}
    public async remove(): Promise<void> {}
    public async findOne(): Promise<void> {}
  };
  
  beforeEach(async () => {

    const JwtServiceProvider = {
      provide: JwtService,
      useFactory: () => ({
        sign: jest.fn(() => []),
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService, 
        JwtService, 
        JwtServiceProvider,
        { 
          provide: getModelToken('Users'), 
          useValue: mockRepository  
        }, 
      
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
