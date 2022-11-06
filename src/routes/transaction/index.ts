import { RequestHandler } from 'express'
import httpStatus from 'http-status-codes';
import Joi from 'joi'
import { TransactionService } from '../../services/transactions/transaction.service';

export const getTransactionsHandler: RequestHandler = async (req, res) => {
  const requestSchema = Joi.object({
    limit: Joi.number().required(),
    page: Joi.number().required(),
  })

  const { error, value } = requestSchema.validate(req.query)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }
  try {

    const transactionData = {
        userId: res.locals.user.id,
        limit: value.limit,
        page: value.page
    }
    const transactions = await TransactionService.getTransactions(transactionData);

    return res.status(httpStatus.OK).json({
      success: true,
      message: "Transactions fetched successfully",
      result: transactions,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
};