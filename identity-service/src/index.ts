import express from "express";
const { PORT = 4000 } = process.env;
const app = express();

// Register routes
import router from "./routes";
app.use(router);

// TODO: Implement HTTPS
app.listen(PORT, () => {
    console.log(`Identity Service running on http://localhost:${PORT}`);
});