import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';

function App() {
  const [htmlFromForgeBackend, setHtmlFromForgeBackend] = useState(null);

  useEffect(() => {
    fetchHtmlFromForgeBackend();
  }, []);

  // This you can replace with a Forge remote
  // https://developer.atlassian.com/platform/forge/remote/calling-from-frontend/
  // const fetchHtmlFromForgeBackend = () => invoke('getHtmlFromForgeBackend', { example: 'example-payload' }).then(setHtmlFromForgeBackend);
  const fetchHtmlFromForgeBackend = async () => {
    const html = await invoke('getHtmlFromForgeBackend', { example: 'example-payload' });
    setHtmlFromForgeBackend(html);
  }

  return (
    <div>
      <button onClick={fetchHtmlFromForgeBackend}>Reload</button>
      <div dangerouslySetInnerHTML={{__html: htmlFromForgeBackend}}></div>
    </div>
  );
}

export default App;
