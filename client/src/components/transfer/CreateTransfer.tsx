import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { createTransfer } from '../../services/TransferService';
import { Transfer } from '../../models/Transfer';

interface Props { 
    type: 0|1
}

const CreateTransfer: React.FC<Props> = (props) => {
    const { type } = props;
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState(0);

    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setAccountNumber('');
        setAmount(0);
        setIsSuccess(false);
        setIsError(false);
        setErrorMessage('');
    }, [type]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const transfer: Transfer = { accountNumber, amount };
        try {
            await createTransfer(transfer, type);
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
        <h1>
            {type === 0 && 'New Debit Transfer'}
            {type === 1 && 'New Credit Transfer'}
        </h1>
        <Form onSubmit={handleSubmit}>
            {isSuccess && <div className="alert alert-success">Transfer successful</div>}
            {isError && <div className="alert alert-danger">{errorMessage}</div>}
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
                <Form.Label>Amount</Form.Label>
                <FormControl
                    type="number"
                    value={amount}
                    onChange={e => setAmount(parseFloat(e.target.value))}
                    placeholder="Enter amount"
                />
            </Form.Group>
            <Form.Group>
              <Button type="submit">Create Transfer</Button>
            </Form.Group>
        </Form>
        </>
    );
}

export default CreateTransfer;
