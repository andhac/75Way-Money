import "reflect-metadata";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { type Express, type Request, type Response } from "express";
import helmet from "helmet";
import http from "http";
import morgan from "morgan";
import { connectDB } from "./app/common/services/database.service";
import {setupSwagger} from "./swagger";
dotenv.config();
import routes from "./app/routes";

const app: Express = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

const port = Number(process.env.PORT) || 5000;

const initApp = async (): Promise<void> => {
  await connectDB();
  app.use("/api", routes);
  app.get("/", (req: Request, res: Response) => {
    res.send({ status: "ok" });
  });
setupSwagger(app)
  http.createServer(app).listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
void initApp();
