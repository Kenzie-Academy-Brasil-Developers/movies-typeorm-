import express, { Application } from "express";
import { handleErrors } from "./errors";
import moviesRoutes from "./routers/movies.routers";

const app: Application = express();
app.use(express.json());

app.use("/movies", moviesRoutes);

app.use(handleErrors);

export default app;
