import express from "express";
import cors from "cors";
import path from 'path'
import { fileURLToPath } from 'url';
import { connectDB } from "./db/index.js";
import AuthRouter from "./routes/auth.js";
import CompanyRouter from "./routes/company.js";
import VacancyRouter from "./routes/vacancy.js";
import config from './config.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json({}));
app.use(cors({
  origin: '*'
}));

app.use("/auth", AuthRouter);
app.use("/company", CompanyRouter);
app.use("/vacancy", VacancyRouter);

async function start() {
  await app.listen(config.port, () => console.log("server is running"));
  await connectDB();
}

start();
