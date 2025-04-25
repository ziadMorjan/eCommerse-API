import express from "express";

let app = express();

// middlewares
app.use(express.json());

export default app;