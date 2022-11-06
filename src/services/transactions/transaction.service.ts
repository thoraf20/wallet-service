import db from '../../database/db'
import { Transaction } from '../interface/transaction.interface';


 export class TransactionService {

  static async getTransactions(transactionData: Transaction) {
      const transactions = await db("transactions").where("user_id", transactionData.userId).paginate({ perPage: transactionData.limit, currentPage: transactionData.page, isLengthAware: true });
      return transactions;
  }
}
