# Demo Credit Wallet-Service
This system allow registered users to fund their wallet, transfer funds and withdraw from their wallet.

# Features
-[x] Basic Authentication (Register & Login)
-[x] Set Wallet Pin
-[x] Fund Wallet
-[x] Verify Wallet Funding
-[x] Fund Transfer
-[x] Withdraw Fund
-[x] Get Transactions

# API Documentation

# How to install

# Using Git (recommended)

-[x] Clone the project from github

git clone https://github.com/devwalex/e-wallet-system.git

# Install npm dependencies
npm install

# Setting up environments

1. You will find a file named .env.example on root directory of project.
2. Create a new file by copying and pasting the file and then renaming it to just .env

cp .env.example .env

3. The file .env is already ignored, so you never commit your credentials.
4. Change the values of the file to your environment. Helpful comments added to .env.example file to  understand the constants.

# Running and resetting migrations
1.  To run migrations
npm run migrate

2.  To reset migrations
npm run migrate:reset

# How to run the app

# Running API server locally
npm start

You will know server is running by checking the output of the command npm start

# Running Tests
npm test

Note: Make sure you set up the test variable in the .env file

# Author
Toheeb Rauf

# License
MIT