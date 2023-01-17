import { Account } from "../models/Account";
import { Transfer } from "../models/Transfer";

let accounts: Account[] = [];
let transfers: Transfer[] = [];

export function createAccount(account: Account) {
  accounts.push(account);
  return account;
}

export function getAccountByNumber(number: string) {
  return accounts.filter(acc => acc.number === number.trim());
}

export function getAccountByName(name: string) {
  return accounts.filter(acc => acc.name === name);
}

export function checkBalance(accountNumber: string, amount: number) {
  const account = accounts.find(acc => acc.number === accountNumber);
  if (account.balance >= amount) {
    return account;
  }
  return null;
}

export function createDebitTransfer(transfer: Transfer) {
  const account = checkBalance(transfer.accountNumber, transfer.amount);
  if (!account) {
    throw new Error('Insufficient funds');
  }

  account.balance -= transfer.amount;
  transfer.date = new Date();
  transfer.type = 0;
  transfers.push(transfer);
  return transfer;
}

export function createCreditTransfer(transfer: Transfer) {
  const account = accounts.find(acc => acc.number === transfer.accountNumber);
  account.balance += transfer.amount;
  transfer.date = new Date();
  transfer.type = 1;
  transfers.push(transfer);
  return transfer;
}

export function getTransfers(number: string) {
  return transfers.filter(transfer => transfer.accountNumber === number);
}