import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  type: 'income' | 'outcome';
  title: string;
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = { total: 0, outcome: 0, income: 0 };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (totalIncome, currentTransaction) =>
        currentTransaction.type === 'income'
          ? totalIncome + currentTransaction.value
          : totalIncome,
      0,
    );

    const outcome = this.transactions.reduce(
      (totalOutcome, currentTransaction) =>
        currentTransaction.type === 'outcome'
          ? totalOutcome + currentTransaction.value
          : totalOutcome,
      0,
    );

    this.balance = {
      total: income - outcome,
      income,
      outcome,
    };

    return this.balance;
  }

  public create({ value, type, title }: TransactionDTO): Transaction {
    const transaction = new Transaction({ value, type, title });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
