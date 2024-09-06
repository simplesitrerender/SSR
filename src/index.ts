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




const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url || '', true);
  
  if (parsedUrl.pathname === '/') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(mainRouteHTML);
  }

  else if (parsedUrl.pathname === getCodeVar?.route) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(getCodeVar?.html)
  };
});


server.listen(port, () => {
  console.log(`╔══════════════════════════════════╗`);
  console.log(`║   Running server on port ${port}    ║`); 
  console.log(`╚══════════════════════════════════╝`);
});
