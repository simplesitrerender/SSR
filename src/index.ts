import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { html, raw } from 'hono/html'
import dotenv from 'dotenv'
import { getMainRouteCode, getMainScriptCode,routes } from './routes/loader'
import * as fs from 'fs/promises'

let port = Number(process.env.PORT || 5520)

let htmla = raw(`
<!DOCTYPE html>
<html lang="en">
<script lang="ts">` + await getMainScriptCode() + `</script>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hono SSR</title>
</head>
<body>` + await getMainRouteCode() + `</body>
</html>
`)


const app = new Hono()

app.get('/', (c) => {
  return c.html(
    html `${htmla}`
  )
})

console.log(`
  ░▒▓███████▓▒░▒▓███████▓▒░▒▓███████▓▒░  
  ░▒▓█▓▒░     ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
  ░▒▓█▓▒░     ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
   ░▒▓██████▓▒░░▒▓██████▓▒░░▒▓███████▓▒░  
         ░▒▓█▓▒░     ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
         ░▒▓█▓▒░     ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
  ░▒▓███████▓▒░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░   
`)

console.log(`╔══════════════════════════════════╗`);
console.log(`║   Running server on port ${port}    ║`); 
console.log(`╚══════════════════════════════════╝`);

async function getCode() {
  for(let i:number = 0; i < routes()?.length; i++) {
        try {
          const html = await fs.readFile('./routes/' + routes()?.[i] + '/page.ssr', 'utf8');
          const typescript = await fs.readFile('./routes/' + routes()?.[i] + '/page.ts', 'utf8');
          return [{
              route: routes()?.[i],
              html: html.replaceAll('<h1>', '<h2>'),
              typescript: typescript
          }]
        } catch (error) {
          console.log(error)
        }
    }
}

let codey = await getCode();
console.log(codey[0].html);
console.log(codey[0].typescript);
console.log(codey[0].route);

for(let i:number = 0; i < routes()?.length; i++) {
  try {
    const htmlFile = raw(await fs.readFile('./routes/' + routes()?.[i] + '/page.ssr', 'utf8'));
    let codeyy = raw(htmlFile.replaceAll(/<h1>/g, "<h2>"));
    let codeyyy = raw(codeyy.replaceAll(/<h1>/g, "</h2>"));
    app.get('/' + routes()?.[i], (c) => {
      return c.html(
        html `${codeyy}`
      )
    })
  } catch (error) {
    console.log('Error in file (Could be empty): ' + routes()?.[i] + '/page.ssr');
  }
}

serve({
  fetch: app.fetch,
  port
})
