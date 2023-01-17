import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { getTransfersByAccount } from '../../services/TransferService';
import { Transfer } from '../../models/Transfer';

interface Props {
    accountNumber: string;
    accountBalance: number;
}

const AccountTransfers: React.FC<Props> = ({ accountNumber, accountBalance }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [transfers, setTransfers] = useState<Transfer[]>([]);

    useEffect(() => {
        const fetchTransfers = async () => {
            const data = await getTransfersByAccount(accountNumber);
            setTransfers(data);
        };
        fetchTransfers();
    }, [accountNumber]);

  return (
    <>
        <td onClick={handleShow}>
            {accountBalance <= 0 ? <span style={{color:'red'}}>{accountBalance} - Warning </span> : accountBalance } 
        </td>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Transfers for account: {accountNumber}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transfers.length === 0 ? <tr><td colSpan={3}>No transfers found</td></tr> : 
                    transfers.map((transfer, index) => (
                        <tr key={index}>
                        <td>{transfer.type === 0 ? 'Debit' : 'Credit'}</td>
                        <td>{transfer.amount}</td>
                        <td>{transfer.date?.toString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default AccountTransfers;
