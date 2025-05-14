import Resolver from '@forge/resolver';

const resolver = new Resolver();

resolver.define('getHtmlFromForgeBackend', (req) => {
  console.log(req);

  return `
<h1>Testing 123</h1>
<script>alert('Hello from script returned via SSR!')</script>
<p style="color: blue">This HTML is coming from a Forge backend (i.e. function)</p>
<p style="color: green">This number was randomly generated in the Forge backend: ${Math.random()}</p>
<p style="color: red">Demo link: <a href="https://google.com">Google</a></p>
`;
});

export const handler = resolver.getDefinitions();
