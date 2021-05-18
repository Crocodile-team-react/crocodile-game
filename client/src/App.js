import './styles/main.scss';
import React from 'react';
import { StartPage, GamePage, NotFoundPage } from './pages';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  const generateGameLobbyId = () => {
    return (Math.random() * 1e17).toString();
  }
  return (
      <Router>
          <div className="background">
              <StartPage/>
          </div>
      </Router>
  );
}

export default App;
