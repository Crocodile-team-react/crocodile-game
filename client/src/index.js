import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from "./store";
import WinnerModal from './components/modal/WinnerModal.jsx'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <WinnerModal/>
        {/* <App /> */}
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

