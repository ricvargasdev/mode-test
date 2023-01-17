import axios from 'axios';
import { Transfer } from '../models/Transfer';

const baseUrl = 'http://localhost:3000';

export async function createTransfer(transfer: Transfer, type: 0|1) {
    try {
        // This is not relevant anymore because we are handling the Type on the Backend as well...
        // if(![0,1].includes(transfer.type)){
            // throw Error('Invalid transfer type');
        // }
        const url = `${baseUrl}/transfers/v1/${type === 0 ? 'debit' : 'credit' }`;
        const response = await axios.post(url, transfer);
        return response.data;
    } catch (err) {
        console.log(err);
        throw new Error('Unable to create transfer');
    }
}

export async function getTransfersByAccount(accountNumber:string) {
    try {
        const url = `${baseUrl}/transfers/v1/${accountNumber}`;
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.log(err);
        throw new Error('Unable to get transfers');
    }
}