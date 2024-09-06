import dotenv from 'dotenv'
import { routes, getCode } from './routes/loader'
import * as fs from 'fs/promises'
import http from 'http';
import url from 'url';
import { mainRouteHTML } from './vars/vars';

dotenv.config();

let port = Number(process.env.PORT || 5520)

let getCodeVar = await getCode();
// codey.html - Get route html file
// codey.typescript - Get route typescript file
// codey.route - Get route name




const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url || '', true);

  if (parsedUrl.pathname === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(mainRouteHTML);
  }
  try {
    const routesList = await routes();
    for (let i = 0; i < routesList.length; i++) {
      if (parsedUrl.pathname === '/' + routesList[i]) {
        const html = await fs.readFile('./routes/' + routesList[i] + '/page.ssr', 'utf8');
        const typescript = await fs.readFile('./routes/' + routesList[i] + '/page.ts', 'utf8');
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(html);
        res.end();
        return;
      }
    }
    
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404 Not Found');
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
