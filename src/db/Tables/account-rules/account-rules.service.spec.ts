import { Test, TestingModule } from '@nestjs/testing';
import { AccountRulesService } from './account-rules.service';

describe('AccountRulesService', () => {
  let service: AccountRulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountRulesService],
    }).compile();

    service = module.get<AccountRulesService>(AccountRulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
