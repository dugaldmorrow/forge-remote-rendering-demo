
## Development notes

The following Glitch app contains the remote part of this Forge app:

https://glitch.com/edit/#!/dx-server-side-rendering


The Forge manifest was initially created by running:

```
npx connect-to-forge@latest --type confluence --url https://dx-server-side-rendering.glitch.me/connect.json
```

## What the demo does

static/spa/src/ForgeServerSideRenderingDemo.js demonstrates how to invoke a Forge function and render the returned HTML.

static/spa/src/RemoteServerSideRenderingDemo.js demonstrates how to invoke a remote service and render the returned HTML. In this case, the endpoint being invoked is https://dx-server-side-rendering.glitch.me/getHtmlFromRemote.

## Testing

To test this app:

1. Check out https://glitch.com/edit/#!/dx-server-side-rendering
2. Run `forge register` in the root directory of the app.
3. `cd static/spa && yarn && yarn build`
4. `forge deploy`
5. `forge install` (into a Confluence site)
6. Insert the macros `Forge Server Side Rendering Demo` and `Remote Server Side Rendering Demo` in a page.

