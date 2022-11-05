import randomstring from "randomstring";
const FlutterwaveKey = process.env.FLUTTERWAVE_KEY;
import axios from "axios";

export const makePayment = async (
  amount: number,
  authenticatedUser: any,
  redirect_url: string,
  description: string
) => {
  try {
    const generatedTransactionReference = randomstring.generate({
      length: 10,
      charset: "alphanumeric",
      capitalization: "uppercase",
    });
    const paymentLink = await axios({
      method: "post",
      url: "https://api.flutterwave.com/v3/payments",
      data: {
        tx_ref: `PID-${generatedTransactionReference}`,
        amount: amount,
        currency: "NGN",
        redirect_url: redirect_url,
        payment_options: "card",
        customer: {
          email: authenticatedUser.email,
          name:
            authenticatedUser.first_name + " " + authenticatedUser.last_name,
        },
        customizations: {
          title: "E-wallet",
          description: description,
        },
      },
      headers: {
        Authorization: `Bearer ${FlutterwaveKey}`,
        Accept: "application/json",
      },
    });
    return paymentLink.data.data.link;
  } catch (error) {
    // console.error("MakePayment Error>>", error.message);
    // throw new Error(error);
  }
};

export const verifyPayment = async (transactionId: string) => {
  try {
    const paymentVerification = await axios({
      method: "get",
      url: `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      headers: {
        Authorization: `Bearer ${FlutterwaveKey}`,
        Accept: "application/json",
      },
    });
    return paymentVerification.data.data;
  } catch (error) {
    // throw new Error(error);
  }
};

export const withdrawPayment = async (amount: number, bank_code: string, account_number: string) => {
  try {
    /**
     * NOTE:
     * Withdraw Fund does work because: Compliance approval required to use this feature
     */

    // const generatedTransactionReference = randomstring.generate({
    //   length: 10,
    //   charset: "alphanumeric",
    //   capitalization: "uppercase",
    // });

    // const payment = await axios({
    //   method: "post",
    //   url: `https://api.flutterwave.com/v3/transfers`,
    //   data: {
    //     account_bank: bank_code,
    //     account_number: account_number,
    //     amount: amount,
    //     narration: "Payment for things",
    //     currency: "NGN",
    //     reference: `dfs23fhr7ntg0293039_PMCK`,
    //     debit_currency: "NGN"
    //   },
    //   headers: {
    //     Authorization: `Bearer ${FlutterwaveKey}`,
    //     Accept: "application/json",
    //   },
    // });

    const generatedTransactionReference = randomstring.generate({
      length: 10,
      charset: "alphanumeric",
      capitalization: "uppercase",
    });
    
    const mockWithdrawFundResponse = {
      status: "success",
      message: "Transfer Queued Successfully",
      data: {
        id: 190626,
        account_number: "0690000040",
        bank_code: "044",
        full_name: "Alexis Sanchez",
        created_at: "2021-04-26T11:19:55.000Z",
        currency: "NGN",
        debit_currency: "NGN",
        amount: amount,
        fee: 10.75,
        status: "NEW",
        reference: `PID-${generatedTransactionReference}`,
        meta: null,
        narration: "Payment for things",
        complete_message: "",
        requires_approval: 0,
        is_approved: 1,
        bank_name: "ACCESS BANK NIGERIA",
      },
    };
    return mockWithdrawFundResponse.data;
  } catch (error) {
    console.error("withdrawPayment Error>>", error);
    // throw new Error(error);
  }
};