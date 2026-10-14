import express from "express";
import cors from "cors";
import applicationsRouter from "./applications";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.use("/api/applications", applicationsRouter);

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});