
import React from 'react';
import { StartPage, GamePage, NotFoundPage } from './pages';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
function App() {
  return (
      <Router>
          <div className="app">
               {/* <ul>
          <li><Link to="/">Start page</Link></li>
          <li><Link to={"/game/" + generateGameLobbyId()}>Game page</Link></li>
          <li><Link to="/whatTheHeck">Not Found page</Link></li>
        </ul> 
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
        </Switch>   */}
              <StartPage/>
          </div>
      </Router>
  );
}

export default App;
