import { RequestHandler } from 'express'
import httpStatus from 'http-status-codes';
import Joi from 'joi'
import { WalletService } from '../../services/wallet/wallet.service';

export const setWalletPinHandler: RequestHandler = async (req, res) => {
  const requestSchema = Joi.object({
    pin: Joi.string().required(),
  })

  const { error, value } = requestSchema.validate(req.body)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }
  try {
  
    const walletData = {
      pin: value.pin,
      user: res.locals.user
    }

    await WalletService.setWalletPin(walletData);

    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "Set pin successfully!",
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const fundWalletHandler: RequestHandler = async (req, res) => {
  const requestSchema = Joi.object({
    amount: Joi.number().required(),
  })

  const { error, value } = requestSchema.validate(req.body)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }
  try {
    const walletData = {
      amount: value.amount,
      user: res.locals.user
    }

    const paymentLink = await WalletService.fundWallet(walletData);

    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "Initialized Wallet Funding",
      paymentLink
    });

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

export const verifyWalletFundingHandler: RequestHandler = async (req, res) => {
  const requestSchema = Joi.object({
    transaction_id: Joi.string().required(),
    tx_ref: Joi.string().required(),
    status: Joi.string().required(),
  })

  const { error, value } = requestSchema.validate(req.body)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }

  try {
    const walletData = {
      transaction_id: value.transaction_id,
      status: value.status,
      tx_ref: value.status,
      user: res.locals.user
    }
    await WalletService.verifyWalletFunding(walletData);

    return res.status(httpStatus.CREATED).send({
      success: true,
      message: "Wallet Funded Successfully",
    });

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

export const transferFundHandler: RequestHandler = async(req, res) => {
  const requestSchema = Joi.object({
    wallet_code_or_email: Joi.string().required(),
    wallet_pin: Joi.string().required(),
    amount: Joi.number().required(),
  })

  const { error, value } = requestSchema.validate(req.body)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }

  try {
    const walletData = {
      amount: value.amount,
      wallet_code_or_email: value.wallet_code_or_email,
      wallet_pin: value.wallet_pin,
      user: res.locals.user
    }

    await WalletService.transferFund(walletData);

    return res.status(httpStatus.CREATED).jsonp({
      success: true,
      message: "Fund Transfer Successful",
    });

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

export const withdrawFundHandler: RequestHandler = async (req, res) => {
  const requestSchema = Joi.object({
    account_number: Joi.string().required(),
    bank_code: Joi.string().required(),
    wallet_pin: Joi.string().required(),
    amount: Joi.number().required(),
  })

  const { error, value } = requestSchema.validate(req.body)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }
  try {
    const walletData = {
      amount: value.amount,
      bank_code: value.bank_code,
      account_number: value.account_number,
      wallet_pin: value.wallet_pin,
      user: res.locals.user
    }

    await WalletService.withdrawFund(walletData);

    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "Withdrawal Successful",
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

export const getWalletBalanceHandler: RequestHandler = async (req, res) => {
  try {
    const walletData = {
      user: res.locals.user
    }
    
    const wallet = await WalletService.getWalletBalance(walletData);

    return res.status(httpStatus.OK).send({
      success: true,
      message: "Returned wallet balance successfully",
      result: wallet.balance
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
};