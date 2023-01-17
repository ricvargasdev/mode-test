import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import ListAccounts from './components/account/ListAccounts';
import CreateAccount from './components/account/CreateAccount';
import CreateTransfer from './components/transfer/CreateTransfer';

function App() {
  return (
    <div>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/accounts">Accounts</Link>
              </li>
              <li>
                <Link to="/accounts/new">New Account</Link>
              </li>
              <li>
                <Link to="/transfer/debit">New Debit Transfer</Link>
              </li>
              <li>
                <Link to="/transfer/credit">New Credit Transfer</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/accounts" element={<ListAccounts />} />
            <Route path="/accounts/new" element={<CreateAccount />} />
            <Route path="/transfer/debit" element={<CreateTransfer type={0} />} />
            <Route path="/transfer/credit" element={<CreateTransfer type={1} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
