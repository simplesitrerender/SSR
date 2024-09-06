import dotenv from 'dotenv'
import http from 'http';

dotenv.config();
// Creating server
const server = http.createServer((req:any, res:any) => {
    // Sending the response
    res.render()
})

// Server listening to port 3000
server.listen((process.env.PORT), () => {
    console.log("Server is Running on port "+process.env.PORT);
})