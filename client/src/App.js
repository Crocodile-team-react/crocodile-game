import './styles/main.scss';
import React from 'react';
import { StartPage, GamePage, NotFoundPage } from './pages';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  const generateGameLobbyId = () => {
    return (Math.random() * 1e17).toString();
  }

  let links = (
  <ul>
    <li><Link to="/">Start page</Link></li>
    <li><Link to={"/game/" + generateGameLobbyId()}>Game page</Link></li>
    <li><Link to="/whatTheHeck">Not Found page</Link></li>
  </ul>
  );

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact>
            <StartPage />
          </Route>
          <Route path="/game/:id">
            <GamePage />
          </Route>
          <Route path="/">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
