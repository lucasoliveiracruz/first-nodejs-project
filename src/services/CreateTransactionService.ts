import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  type: 'income' | 'outcome';
  title: string;
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    const isOutcome = type === 'outcome';

    if (isOutcome && value > total) {
      throw new Error('You dont have enough balance for this transaction');
    }

    return this.transactionsRepository.create({ title, type, value });
  }
}

export default CreateTransactionService;
