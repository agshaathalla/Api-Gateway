import express from "express";
import router from "./router/router.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use("/",router);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});