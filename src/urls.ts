import express from "express";
import { loiginHandler, registerHandler } from "./routes/user";
import { fundWalletHandler, getWalletBalanceHandler, setWalletPinHandler, transferFundHandler, verifyWalletFundingHandler, withdrawFundHandler } from "./routes/wallet";

const router = express.Router();

// auth
router.post("/register", registerHandler);
router.post("/login", loiginHandler);

// wallet
router.post("/wallet/set-pin", setWalletPinHandler);
router.post("/wallet/fund", fundWalletHandler);
router.get("/wallet/verify", verifyWalletFundingHandler);
router.post("/wallet/transfer", transferFundHandler);
router.post("/wallet/withdraw", withdrawFundHandler);
router.get("/wallet/balance", getWalletBalanceHandler);

export default router;