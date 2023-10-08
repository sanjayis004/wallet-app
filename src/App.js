import { Router, Route, Switch, Redirect } from 'react-router-dom'
import WalletHomePage from './pages/WalletHome';
import WalletTransactionsPage from './pages/walletTransaction.js'
import { useState } from 'react';

function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);

  const componentDidCatch = (error, errorInfo) => {
    setError(error);
  };

  if (error) {
    return <div>Something went wrong.</div>; // Display an error message
  }

  return children; // Render the children if no error occurred
}


function App(props) {
  const { history } = props
  return (
    <div className="App">
      <ErrorBoundary>
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home" component={WalletHomePage} />
            <Route path="/transactions" component={WalletTransactionsPage} />
          </Switch>
        </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;
