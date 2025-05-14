import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';

const ForgeServerSideRenderingDemo = () => {

  const [htmlFromForgeBackend, setHtmlFromForgeBackend] = useState(null);

  useEffect(() => {
    fetchHtmlFromForgeBackend();
  }, []);

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

export default ForgeServerSideRenderingDemo;
