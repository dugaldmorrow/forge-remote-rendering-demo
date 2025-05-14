import React, { useEffect, useState } from 'react';
import { invokeRemote } from '@forge/bridge';

const RemoteServerSideRenderingDemo = () => {

  const [htmlFromRemoteBackend, setHtmlFromRemoteBackend] = useState(null);

  useEffect(() => {
    fetchHtmlFromRemoteBackend();
  }, []);

  const fetchHtmlFromRemoteBackend = async () => {
    // Docs: https://developer.atlassian.com/platform/forge/remote/calling-from-frontend/
    const response = await invokeRemote({
      // This is defined here: https://glitch.com/edit/#!/dx-server-side-rendering?path=app.js
      path: '/getHtmlFromRemote',
      method: 'GET'
    });
    setHtmlFromRemoteBackend(response.body.html);
  }

  return (
    <div>
      <button onClick={fetchHtmlFromRemoteBackend}>Reload</button>
      <div dangerouslySetInnerHTML={{__html: htmlFromRemoteBackend}}></div>
    </div>
  );
}

export default RemoteServerSideRenderingDemo;
