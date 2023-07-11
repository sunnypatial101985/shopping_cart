import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import bodyParser from 'body-parser'
import router from './api/api.js'
import striperoutes from './api/stripe-api.js'
import connectDb from './db/connection.js'
const app = express()

app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://schoolapp-ibph.onrender.com/"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);
    next();
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())
    // CORS ERROR
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
app.use('/api/stripe', striperoutes)
const port = process.env.PORT;
// DATABASE CONNECTION
const DB_URL = process.env.DB_URL
const DB_NAME = process.env.DB_NAME
connectDb(DB_URL, DB_NAME)

// Function to serve all static files
// inside public directory.
app.use(express.static('public'));
app.use('/images', express.static('images'));

app.get('/', function(req, res) {
    res.send('Hello World')
})

// new code added
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, './frontend/build')))

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './frontend/build/index.html'))
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})