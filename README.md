# 🎮 Gacha Game Backend API

Backend API for the Gacha Game Technical Assessment.

This project provides RESTful APIs for authentication, wallet management, inventory, event management, item management, and gacha mechanics using a weighted random algorithm with MongoDB atomic transactions.

---

# ✨ Features

## Authentication

- JWT Authentication
- Access Token (15 Minutes)
- Refresh Token (7 Days)
- Password Hashing using bcrypt
- Role-based Authorization

---

## Wallet

- Get Wallet Balance
- Wallet Transaction History
- Coin Deduction during Gacha
- Atomic Wallet Update

---

## Inventory

- Store User Items
- Quantity-based Inventory
- MongoDB bulkWrite() Optimization

---

## Gacha

- Single Draw
- Multiple Draw (x10)
- Weighted Random Algorithm
- Event-based Drop Rate Configuration
- Atomic Transaction

---

## Admin

- CRUD Items
- CRUD Events
- Configure Event Items
- Configure Drop Rates

---

## Database

- MongoDB
- Mongoose
- Soft Delete
- MongoDB Transaction
- Collection Relationships

---

# 🛠 Tech Stack

- NodeJS
- ExpressJS
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt

---

# 📂 Project Structure

```
src
│
├── config
├── controllers
├── middlewares
├── models
├── repositories
├── routes
├── services
├── utils
├── validations
└── index.ts
```

---

# 🚀 Installation

Clone repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

---

# ⚙ Environment Variables

Create a `.env` file.

```env
PORT=

DATABASE_URI=

DATABASE_NAME=

ACCESS_TOKEN_SECRET=

REFRESH_TOKEN_SECRET=

JWT_EXPIRES_IN=

JWT_REFRESH_EXPIRES_IN=
```

---

# ▶ Running Project

Development

```bash
npm run dev
```
or
```bash
yarn dev
```

Build

```bash
npm run build
```
or
```bash
yarn build
```
---

# 📡 API Modules

## Authentication

- Login
- Refresh Token

---

## Wallet

- Get Wallet

---

## Inventory

- Get Inventory

---

## Gacha

- Single Draw
- Multiple Draw

---

## Events

- Get Events

---

## Items

- CRUD Items

---

## Event Items

- Add Item to Event
- Update Drop Rate
- Remove Item from Event

---

# 🗄 Database Collections

```
auths

roles

wallets

transactions

items

events

eventItems

inventories

histories
```

---

# 🎯 Gacha Workflow

```
User Request

↓

Validate JWT

↓

Check Wallet Balance

↓

Weighted Random

↓

Start MongoDB Transaction

↓

Update Wallet

↓

Insert Transaction

↓

Update Inventory

↓

Insert Gacha Log

↓

Commit

↓

Return Rewards
```

---

# ⚡ Weighted Random

Each Event has configurable Drop Rates.

Example

| Item | Drop Rate |
|------|----------:|
| Silver | 40% |
| Gold | 30% |
| Diamond | 20% |
| Legendary | 10% |

The total Drop Rate inside one event must equal **100%**.

---

# 🔒 Atomic Transaction

MongoDB Transactions are used to ensure consistency across:

- Wallet
- Transactions
- Inventory
- Gacha Logs

If any operation fails, the entire transaction is rolled back automatically.

---

# 📖 Documentation

Detailed system documentation is available in the project documentation.

Documentation includes:

- Architecture
- Database Design
- Authentication Flow
- Wallet Flow
- Gacha Flow
- Inventory Flow
- Weighted Random Algorithm
- MongoDB Transaction
- Design Decisions
link: https://docs.google.com/document/d/1RTNwmi8KOnwDOcBsm5ITSm0YAV9jOXMKQBZmr8slb2I/edit?usp=sharing
---

# 🧪 API Testing

A Postman Collection and Environment are included to simplify API testing.
Import both files into Postman and configure the environment variables before testing.
Collection: https://drive.google.com/file/d/1X5mTheqx1v7cW8HG-4nhO_NPbnvcuQSb/view?usp=drive_link
Environment: https://drive.google.com/file/d/19RLfdGamVgNpIjoBOvGAWSIPFRK-OZaO/view?usp=drive_link

---
