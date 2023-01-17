import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { createAccount } from '../../services/AccountService';
import { Account } from '../../models/Account';

interface Props { }

const CreateAccount: React.FC<Props> = () => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const account: Account = { number, name, balance: Number(balance) };
  
    try {
      await createAccount(account);
      setIsSuccess(true);
      setIsError(false);
    } catch (err) {
        setIsError(true);
        setIsSuccess(false);
        if (err instanceof Error) {
            setErrorMessage(err.message);
        } else {
            setErrorMessage("An unknown error occurred. Please try again later.");
        }
    }
  };

  return (
    <>
      <h1>Create New Account</h1>
      <Form onSubmit={handleSubmit}>
        {isSuccess && <div className="alert alert-success">Account created successfully</div>}
        {isError && <div className="alert alert-danger">{errorMessage}</div>}
        <Form.Group>
          <Form.Label>Account Number</Form.Label>
          <FormControl
            type="text"
            value={number}
            onChange={e => setNumber(e.target.value)}
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
          <Form.Label>Balance</Form.Label>
          <FormControl
            type="text"
            value={balance}
            onChange={e => setBalance(parseFloat(e.target.value))}
            placeholder="Enter balance"
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit">Create Account</Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default CreateAccount;
