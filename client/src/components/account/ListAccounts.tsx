import React, { useState } from 'react';
import { Form, FormControl, Table, Button } from 'react-bootstrap';
import AccountTransfers from '../transfer/AccountTransfers';
import { getAccountByName, getAccountByNumber } from '../../services/AccountService';
import { Account } from '../../models/Account';

interface Props { }

const AccountList: React.FC<Props> = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [name, setName] = useState('');
  const [accounts, setAccounts] = useState<Account[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let results = [];
    if (accountNumber) {
      results = await getAccountByNumber(accountNumber);
    } else if (name) {
      results = await getAccountByName(name);
    }
    setAccounts(results);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Account Number</Form.Label>
          <FormControl
            type="text"
            value={accountNumber}
            onChange={e => setAccountNumber(e.target.value)}
            placeholder="Enter account number"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <FormControl
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit">Search</Button>
        </Form.Group>
      </Form>
      <br />
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Account Number</th>
            <th>Name</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
        {accounts.length === 0 ? <p>No accounts found</p> : 
          accounts.map((account, index) => (
            <tr key={index}>
              <td>{account.number}</td>
              <td>{account.name}</td>
              <td>
                <AccountTransfers accountNumber={account.number} accountBalance={account.balance} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
  </>
  );
}

export default AccountList;