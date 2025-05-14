import React from 'react';
import ReactDOM from 'react-dom';
import ForgeServerSideRenderingDemo from './ForgeServerSideRenderingDemo';
import RemoteServerSideRenderingDemo from './RemoteServerSideRenderingDemo';
import { view, router } from '@forge/bridge';
import '@atlaskit/css-reset';

setTimeout(async () => {
  const context = await view.getContext();
  // console.log(`FE context = ${JSON.stringify(context, null, 2)}`);
  let renderedApp = null;
  if (context.moduleKey === 'forge-server-side-rendering-macro') {
    renderedApp = <ForgeServerSideRenderingDemo />;
  } else if (context.moduleKey === 'remote-server-side-rendering-macro') {
    renderedApp = <RemoteServerSideRenderingDemo />;
  }
  ReactDOM.render(
    <React.StrictMode>
      {renderedApp}
    </React.StrictMode>,
    document.getElementById('root')
  );
});

document.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    const anchor = e.target.closest('a');
    e.preventDefault();
    router.open(anchor.href).catch((error) => {
      console.debug('The user decided to cancel the opening of the link:', error);
    });
  }
});
