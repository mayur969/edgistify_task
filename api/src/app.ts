import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.route";
import env from "../env";
import connectToDatabase from "./lib/db";

connectToDatabase();

const app = express();
const port = env.PORT || 8000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);
app.use(cookieParser());
app.use("/api/v1", routes);

app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
