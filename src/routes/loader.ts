import * as fsPromise from 'fs/promises';
import * as fs from 'fs';
import * as path from 'path';

function routes() {
    const routesDir = path.join('routes'); 

    if (fs.existsSync(routesDir)) {
        return fs.readdirSync(routesDir).filter((file) => fs.statSync(path.join(routesDir, file)).isDirectory());
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

export { getMainRouteCode, getMainScriptCode, routes };
  

  