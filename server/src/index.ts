import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { 
  createAccount, 
  getAccountByName, 
  getAccountByNumber,
  checkBalance, 
  createDebitTransfer, 
  createCreditTransfer, 
  getTransfers 
} from './services/AccountService';

const app = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:3001' }));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/account/v1/', async (req, res) => {
  try {
    const account = await createAccount(req.body);
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/account/v1/getByNumber/:number', async (req, res) => {
  try {
    const account = await getAccountByNumber(req.params.number);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    return res.json(account);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/account/v1/getByName/:name', async (req, res) => {
  try {
    const account = await getAccountByName(req.params.name);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    return res.json(account);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/transfers/v1/debit', async (req, res) => {
  try {
    const account = await checkBalance(req.body.accountNumber, req.body.amount);
    if (!account) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    const debitTransfer = await createDebitTransfer(req.body);
    return res.status(201).json(debitTransfer);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/transfers/v1/credit', async (req, res) => {
  try {
    const creditTransfer = await createCreditTransfer(req.body);
    return res.status(201).json(creditTransfer);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/transfers/v1/:number', async (req, res) => {
  try {
    const transfers = await getTransfers(req.params.number);
    return res.json(transfers);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


