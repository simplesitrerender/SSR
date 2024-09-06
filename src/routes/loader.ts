import * as fsPromise from 'fs/promises';
import * as fs from 'fs';
import * as path from 'path';

function routes() {
    const routesDir = path.join('routes'); 

    if (fs.existsSync(routesDir)) {
        return fs.readdirSync(routesDir).filter((file) => fs.statSync(path.join(routesDir, file)).isDirectory());
    }
}

async function getCode() {
    // @ts-ignore
    for(let i:number = 0; i < routes()?.length; i++) {
          try {
            const html = await fsPromise.readFile('./routes/' + routes()?.[i] + '/page.ssr', 'utf8');
            const typescript = await fsPromise.readFile('./routes/' + routes()?.[i] + '/page.ts', 'utf8');
            return {
                route: routes()?.[i],
                html: html.replaceAll('<h1>', '<h2>'),
                typescript: typescript
            }
          } catch (error) {
            console.log(error)
          }
      }
  }

function loader() {
    console.log(routes());  
    console.log(routes()?.length) 
}

async function getMainRouteCode() {
    return fsPromise.readFile('./routes/page.ssr', 'utf8');
}

async function getMainScriptCode() {
    return fsPromise.readFile('./routes/page.ts', 'utf8');
}
// loader();

export { getMainRouteCode, getMainScriptCode, routes, getCode };
  

  