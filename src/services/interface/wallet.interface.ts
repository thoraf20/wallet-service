export interface Wallet {
  user: {
    id: string;
    email: string;
  },
}

export interface WalletPin {
  user: {
    id: string;
    email: string;
  },
  pin: string;
}

export interface FundWallet {
  user: {
    id: string;
    email: string;
  },
  amount: number;
}

export interface VerifyFunding {
  user: {
    id: string;
    email: string;
  },
  transaction_id: string;
}

export interface FundTransfer {
  user: {
    id: string;
    email: string;
  },
  wallet_code_or_email: string;
  amount: number;
  wallet_pin: string;
}

export interface WithdrawFund {
  user: {
    id: string;
    email: string;
  },
  bank_code: string;
  account_number: string;
  amount: number;
  wallet_pin: string;
}