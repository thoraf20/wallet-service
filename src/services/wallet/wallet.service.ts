import db from '../../database/db'
import bcrypt from 'bcryptjs'
import randomstring from "randomstring";
import { FundTransfer, FundWallet, VerifyFunding, Wallet, WalletPin, WithdrawFund } from '../interface/wallet.interface';
import {
  makePayment,
  verifyPayment,
  withdrawPayment,
} from "../../helpers/payment.transactions";

export class WalletService {
  static async createWallet(userId: string) {
    const user = await db.select("*").from("users").where("id", userId).first();

    const generatedWalletCode = randomstring.generate({
      length: 7,
      charset: "alphanumeric",
      capitalization: "uppercase",
    });

    const wallet = await db("wallets").insert({
      user_id: user.id,
      wallet_code: generatedWalletCode,
    });
    return wallet;
  }

  static async setWalletPin (walletData: WalletPin) {
    const user = walletData.user;
    const pin = walletData.pin.toString();
  
    const hashPin = bcrypt.hashSync(pin, 10);
  
    const wallet = await db("wallets").where("user_id", user.id).first();
    if (!wallet.wallet_pin) {
      await db("wallets")
        .where("user_id", user.id)
        .update({ wallet_pin: hashPin });
    }
    return wallet;
  }

  static async fundWallet(walletData: FundWallet) {
    const user = walletData.user;
    const amount = walletData.amount;

    const appUrl = process.env.APP_URL
    ? process.env.APP_URL
    : "http://localhost:3000";

    const paymentLink = await makePayment(
      amount,
      user,
      `${appUrl}/wallet/verify`,
      "Wallet Funding"
    );

    return paymentLink;
  }

  static async verifyWalletFunding(walletData: VerifyFunding) {
    const user = walletData.user;

    const payment = await verifyPayment(walletData.transaction_id);

    if (payment.customer.email !== user.email) {
      return Promise.reject({
        success: false,
        message: "Could not verify payment",
      });
    }

    const transaction = await db("transactions")
    .where("user_id", user.id)
    .where("transaction_code", payment.id)
    .first();

    if (!transaction) {
      await db("wallets")
        .where("user_id", user.id)
        .increment("balance", payment.amount);
  
      await db("transactions").insert({
        user_id: user.id,
        transaction_code: payment.id,
        transaction_reference: payment.tx_ref,
        amount: payment.amount,
        description: "Wallet Funding",
        status: payment.status,
        payment_method: payment.payment_type,
        is_inflow: true,
      });
    }

    return payment;
  }

  static async transferFund (walletData: FundTransfer) {
    const sender = walletData.user;
    const walletCodeOrEmail = walletData.wallet_code_or_email;
    const amount = walletData.amount;
    const walletPin = walletData.wallet_pin;

    let recipient;
   if (walletCodeOrEmail.includes("@")) {
    recipient = await db("users").where("email", walletCodeOrEmail).first();
   } else {
    const recipientWallet = await db("wallets")
      .where("wallet_code", walletCodeOrEmail)
      .first();

    const recipientID = recipientWallet?.user_id || null;

    recipient = await db("users").where("id", recipientID).first();
    }

    if (!recipient) {
      return Promise.reject({
        message: "Recipient not found",
        success: false,
      });
    }
  
    if (sender.id === recipient.id) {
      return Promise.reject({
        message: "You cannot transfer fund to yourself",
        success: false,
      });
    }

    const senderWallet = await db("wallets").where("user_id", sender.id).first();

    if (senderWallet.balance < amount) {
      return Promise.reject({ message: "Insufficient Fund", success: false });
    }

    // Check if wallet pin is correct
    const match = await bcrypt.compare(walletPin, senderWallet.wallet_pin);

    if (!match) {
      return Promise.reject({
        message: "Incorrect Pin",
        success: false,
      });
    }

    const generatedTransactionReference = randomstring.generate({
      length: 10,
      charset: "alphanumeric",
      capitalization: "uppercase",
    });

    const generatedTransactionCode = randomstring.generate({
      length: 7,
      charset: "numeric",
    });

    // Deduct from sender wallet
    await db("wallets").where("user_id", sender.id).decrement("balance", amount);

    await db("transactions").insert({
      user_id: sender.id,
      transaction_code: generatedTransactionCode,
      transaction_reference: `PID-${generatedTransactionReference}`,
      amount: amount,
      description: "Fund Transfer",
      status: "successful",
      payment_method: "wallet",
      is_inflow: false,
    });

    // Add to recipient wallet
    await db("wallets")
      .where("user_id", recipient.id)
      .increment("balance", amount);

    await db("transactions").insert({
      user_id: recipient.id,
      transaction_code: generatedTransactionCode,
      transaction_reference: `PID-${generatedTransactionReference}`,
      amount: amount,
      description: "Fund Transfer",
      status: "successful",
      payment_method: "wallet",
      is_inflow: true,
    });
  }

  static async withdrawFund (walletData: WithdrawFund) {
    const user = walletData.user;
    const bankCode = walletData.bank_code;
    const accountNumber = walletData.account_number;
    const amount = walletData.amount;
    const walletPin = walletData.wallet_pin;

    const userWallet = await db("wallets").where("user_id", user.id).first();

    if (userWallet.balance < amount) {
      return Promise.reject({ message: "Insufficient Fund", success: false });
    }

    const match = await bcrypt.compare(walletPin, userWallet.wallet_pin);

    if (!match) {
      return Promise.reject({
        message: "Incorrect Pin",
        success: false,
      });
    }

    const payment = await withdrawPayment(amount, bankCode, accountNumber);
    
    const amt = payment?.amount as number
    const amtFee = payment?.fee as number

    const amountToDeduct = amt + amtFee;

    // Deduct from user wallet
    await db("wallets")
    .where("user_id", user.id)
    .decrement("balance", amountToDeduct);

    await db("transactions").insert({
      user_id: user.id,
      transaction_code: payment?.id,
      transaction_reference: payment?.reference,
      amount: amountToDeduct,
      description: "Fund Withdrawal",
      status: "successful",
      payment_method: "bank transfer",
      is_inflow: false,
    });
  }

  static async getWalletBalance(walletData: Wallet) {
    const user = walletData.user;
    const wallet = await db("wallets").where("user_id", user.id).first();

    return wallet;
  }
}