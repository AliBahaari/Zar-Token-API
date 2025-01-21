## Description

Zar Token API

## Installation

```bash
$ npm install
```

## Running the app

```bash
# Development
$ npm run start

# Watch Mode
$ npm run start:dev

# Production Mode / Server
$ npm install -g pm2
$ npm run build
$ pm2 start dist/main.js --name API
```

## Endpoints Flow

After running (i.e. `npm run start`), call:

```bash
POST http://localhost:3000/api/v1/key/generate

BODY {
  "title": "YOUR_TITLE"
}
```

Copy `key` property value and fill `Authorization` header value using the `key` property value.
Than, call:

```bash
POST http://localhost:3000/api/v1/wallet/create

BODY {
  "fullName": "YOUR_NAME",
  "mintAmount": "YOUR_MINT_AMOUNT"
}
```

That's it!
Response contains information about generated wallet addresses.

You can get balance of a wallet address as below:

```bash
GET http://localhost:3000/api/v1/wallet/getBalance/:walletAddress
```

## Modify Somethings

- Open `src/main.ts` file and write your **Domain Name or IP Address** on line 9.
- Open `src/wallet/wallet.service.ts` and write your **Mainnet RPC URL** on line 32.
- Open `src/wallet/wallet.service.ts` and write your **Wallet Private Key** on line 35.
- Open `src/wallet/abis/Zar.ts` and write your **Deployed Smart Contract Address** on line 35.
- Open `src/app.module.ts` and write your **Database Configuration** on line 11 to 18.
