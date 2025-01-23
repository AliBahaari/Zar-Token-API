## Description

Zar API

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

### Generate a key:

```bash
POST http://localhost:3000/api/v1/key/generate

BODY {
  "title": "YOUR_TITLE"
}
```

Copy `key` property value and fill `Authorization` header.

### Create a wallet:

```bash
POST http://localhost:3000/api/v1/wallet/create

BODY {
  "fullName": "YOUR_NAME",
}
```

### Mint amount of Pars, ZKCoin or Zar tokens for the created wallet address:

```bash
POST http://localhost:3000/api/v1/wallet/mint

BODY {
  "walletAddress": "CREATED_WALLET_ADDRESS",
  "amount": "MINT_AMOUNT",
  "type": "Pars" | "ZKCoin" | "Zar"
}
```

### Get the balance of the created wallet address for the tokens above:

```bash
GET http://localhost:3000/api/v1/wallet/getBalance/:walletAddress
```

That's it!

## Modify Some Sections

- Open `src/main.ts` file and write your **Domain Name or IP Address** on line 9.
- Open `src/app.module.ts` and write your **Database Configuration** on line 11 to 18.
