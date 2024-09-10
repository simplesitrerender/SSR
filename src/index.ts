import dotenv from 'dotenv'
import { routes, getCode, getMainRouteCode, getMainScriptCode } from './routes/loader'
import * as fs from 'fs/promises'
import http from 'http';
import url from 'url';
import { mainRouteHTML } from './vars/vars';




dotenv.config();

let port = Number(process.env.PORT || 5520)

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url || '', true);

  if (parsedUrl.pathname === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(mainRouteHTML);
  }
  try {
    let routesList = await routes();
    if(routesList) {
      for (let i = 0; i < routesList.length; i++) {
        const typescript = await fs.readFile('./routes/' + routesList[i] + '/page.ts', 'utf8');
        const html = await fs.readFile('./routes/' + routesList[i] + '/page.ssr', 'utf8')+`<script>`+typescript+`</script>`;
        if (parsedUrl.pathname === '/' + routesList[i]) {
          res.statusCode = 200;
          res.write(html);
          res.end();
          return;
      }
      }
    }
    else if(parsedUrl.pathname === '/') {
      res.statusCode = 200;
      res.write(getMainRouteCode+`<script>`+getMainScriptCode+`</script>`)
      res.end()
      return;
    }
  } catch (error) {
    console.error('Error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal Server Error');
  }
});


server.listen(port, () => {
  console.log(`╔══════════════════════════════════╗`);
  console.log(`║   Running server on port ${port}    ║`); 
  console.log(`╚══════════════════════════════════╝`);
});
