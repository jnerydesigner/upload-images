import * as dotenv from 'dotenv';
import express from 'express';
import { routes } from './routes';
import path from 'path';
dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
)

app.use(routes);


app.listen(3333, () => console.log(`${process.env.SERVER} is running 🏎️ `));