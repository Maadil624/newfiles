import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import connectDB from './database/database.js'
import route from './router/route.js'
import jobRoute from './router/jobRoute.js'
import http from 'http'
import { Server } from 'socket.io'
import session from 'express-session'
import passport from 'passport'
const app = express()

app.set('view engine', 'ejs')
app.use(
  session({
    secret: 'hello',
    resave: false,
    saveUninitialized: false,
    cookie: { path: '/' }
  })
)
// initializing dont env
dotenv.config()

// middlewares
app.use(express.json())
// app.use(express.urlencoded())
// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: "*" }))
app.use(route)
app.use(helmet())
app.use(jobRoute)

//connecting to Monogo DB
connectDB()


passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// we socketsv implementation
const httpserver = http.createServer(app);
export const io = new Server(httpserver, { cors: { origin: '*' } });
httpserver.listen(5000, () => {
  console.log("server started")
})
// getting route from router folder
// app.listen(5000,()=>{
//     console.log("server started")
// })