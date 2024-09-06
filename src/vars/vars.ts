import { getMainRouteCode, getMainScriptCode } from '../routes/loader'

let mainRouteHTML: string = `
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
`

export {mainRouteHTML}