import axios from 'axios';
import { Account } from '../models/Account';

const baseUrl = 'http://localhost:3000';

export async function getAccountByNumber(number: string) {
  try {
    const { data } = await axios.get(`${baseUrl}/account/v1/getByNumber/${number}`);
    return data;
  } catch (err) {
    throw new Error(err as string);
  }
}

export async function getAccountByName(name: string) {
  try {
    const { data } = await axios.get(`${baseUrl}/account/v1/getByName/${name}`);
    return data;
  } catch (err) {
    throw new Error(err as string);
  }
}

export async function createAccount(account: Account) {
    try {
        const response = await axios.post(`${baseUrl}/account/v1/`, account);
        return response.data;
    } catch (err) {
        console.log(err);
        throw new Error('Unable to create account');
    }
}