import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { router } from '@forge/bridge';

import '@atlaskit/css-reset';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

document.addEventListener('click', (e) => {
  // Check if the clicked element or parent is a tag

  if (e.target.closest('a')) {
      const anchor = e.target.closest('a');
      e.preventDefault(); 
      router.open(anchor.href);
  }
});
