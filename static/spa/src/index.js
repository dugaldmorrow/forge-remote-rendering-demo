import React from 'react';
import ReactDOM from 'react-dom';
import ForgeServerSideRenderingDemo from './ForgeServerSideRenderingDemo';
import RemoteServerSideRenderingDemo from './RemoteServerSideRenderingDemo';
import { view, router } from '@forge/bridge';
import '@atlaskit/css-reset';

// setTimeout(async () => {
//   const context = await view.getContext();
//   // console.log(`FE context = ${JSON.stringify(context, null, 2)}`);
//   let renderedApp = null;
//   if (context.moduleKey === 'forge-server-side-rendering-macro') {
//     renderedApp = <ForgeServerSideRenderingDemo />;
//   } else if (context.moduleKey === 'remote-server-side-rendering-macro') {
//     renderedApp = <RemoteServerSideRenderingDemo />;
//   }
//   ReactDOM.render(
//     <React.StrictMode>
//       {renderedApp}
//     </React.StrictMode>,
//     document.getElementById('root')
//   );
// });

// document.addEventListener('click', (e) => {
//   if (e.target.closest('a')) {
//     const anchor = e.target.closest('a');
//     e.preventDefault();
//     router.open(anchor.href).catch((error) => {
//       console.debug('The user decided to cancel the opening of the link:', error);
//     });
//   }
// });

import { invoke, invokeRemote } from '@forge/bridge';

setTimeout(async () => {

  const context = await view.getContext();
  let html = `<div>????</div>`;
  if (context.moduleKey === 'forge-server-side-rendering-macro') {
    html = await invoke('getHtmlFromForgeBackend', { example: 'example-payload' })
  } else if (context.moduleKey === 'remote-server-side-rendering-macro') {
    const response = await invokeRemote({
      // This is defined here: https://glitch.com/edit/#!/dx-server-side-rendering?path=app.js
      path: '/getHtmlFromRemote',
      method: 'GET'
    });
    html = response.body.html;
  }

// html = `
// <html lang="en" style="height: auto; overflow-y: hidden;">
//   <head>
//     <meta charset="utf-8">
//   </head>
//   <body style="border: 1px solid red">
//     <p style="color: blue">This HTML is coming from a Forge backend (i.e. function)</p>
//     <p style="color: green">This number was randomly generated in the Forge backend: 0.3144618700087749</p>
//     <p style="color: red">Demo link: <a href="https://google.com">Google</a></p>
//     <form id="my-form">
//       <input type="text" name="in" value="some data" />
//       <button type="submit">Go</button>
//     </form>
//   </body>
// </html>`;

html = `
<html lang="en">
  <head>
    <script src="https://forge.cdn.prod.atlassian-dev.net/global-bridge.js"></script>
    <script async="" src="https://forge.cdn.prod.atlassian-dev.net/iframeResizer.contentWindow.min.js"></script>
    <meta charset="utf-8">
    <title>ConfiForms Forge App 22222</title>
  </head>
  <body>
    <div>Hello world of Forge</div>
  </body>
</html>`;

  const bridgeScript = `<script src="https://forge.cdn.prod.atlassian-dev.net/global-bridge.js"></script>`;
  const iFrameResizerScript = `<script async="" src="https://forge.cdn.prod.atlassian-dev.net/iframeResizer.contentWindow.min.js"></script>`;
  if (html.indexOf(iFrameResizerScript) === -1) {
    html = html.replace(`<head>`, `<head>\n${iFrameResizerScript}`);
  }
  if (html.indexOf(bridgeScript) === -1) {
    html = html.replace(`<head>`, `<head>\n${bridgeScript}`);
  }

  document.open();
  document.write(html);
  document.close();


  console.log('HTML content written to the document:', html);

  document.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      const anchor = e.target.closest('a');
      e.preventDefault();
      router.open(anchor.href).catch((error) => {
        console.debug('The user decided to cancel the opening of the link:', error);
      });
    }
  });

  // Your remote base URL
  const baseUrl = `https://your-remote-api.com`;
  const forms = document.querySelectorAll('form')
  forms.forEach(form => {
    form.addEventListener('submit', async function(e) {
      // Prevent the default form submission
      e.preventDefault();
      const method = form.method.toUpperCase() || 'GET';
      const action = form.action || window.location.href;
      try {
        let response;
        const formData = new FormData(form);
        if (method === 'GET') {
          const params = new URLSearchParams(formData).toString();
          const url = action + (action.includes('?') ? '&' : '?') + params;
          const path = url.replace(baseUrl, '');
          response = await invokeRemote({
            path: path,
            method: method,
            headers: {
              'Accept': 'application/json'
            }
          });
        } else {
          const hasFiles = Array.from(form.elements).some(element => 
            element.type === 'file' && element.files.length > 0
          );
          const headers = {
            'Accept': 'application/json'
          };
          if (hasFiles) {
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
          }
          const body = hasFiles ? formData : new URLSearchParams(formData);
          const path = action.replace(baseUrl, '');
          response = await invokeRemote({
            path: path,
            method: method,
            headers: headers,
            body: body
          });
        }
        if (response.ok) {
          try {
            const data = await response.json();
            console.log('Form submitted successfully:', data);
            return data;
          } catch (e) {
            const text = await response.text();
            console.log('Form submitted successfully:', text);
            return text;
          }
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    });
  });


});