export interface Transfer {
    accountNumber: string;
    type: 0 | 1; // 0 -> Debit, 1 -> Credit
    amount: number;
    date: Date;
}