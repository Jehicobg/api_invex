import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import { responseHandler } from "./middlewares/responseHandler.middelware";
import routes from "./routes/index";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(responseHandler);
app.use("/api", routes);
app.use(errorMiddleware);

export default app;
