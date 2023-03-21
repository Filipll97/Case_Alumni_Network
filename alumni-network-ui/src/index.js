import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initialize } from "./keycloak";
import Loading from "./components/Loading/Loading";
import keycloak from './keycloak';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faArrowRight);


const root = ReactDOM.createRoot(document.getElementById('root'));
// Display a loading screen when connecting to Keycloak
root.render(<Loading message="Connecting to Alumni Network..." />)

// Initialize Keycloak
initialize()
  .then(() => { // If No Keycloak Error occurred - Display the App
    if (!keycloak.authenticated) {
      keycloak.login()
    }
    root.render(
      <App />
    );
  })
  .catch(() => {
    root.render(
      <p>Could Not Connect To Keycloak.</p>
    );
  });
