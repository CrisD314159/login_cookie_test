import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import GetRouter from "./routes/router.js";
import helmet from "helmet";
dotenv.config();
const whitelist = ['http://localhost:5173', 'https://cookie-test-front-eight.vercel.app/login']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(helmet())

app.use('/api', GetRouter());

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
})



