import express from 'express';
import noteRoutes from './routes/noteRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import rateLimiter from './middleware/rateLimiter.js'; 
import cors from "cors";
import path from "path"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

// middleware - allows to access the req.body 
app.use(express.json()); // this middleware parse JSON bodies: req.body
// our simple custom middlewear
if (process.env.NODE_ENV !== "production") {
    app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

}
app.use(rateLimiter);
app.use("/api/notes", noteRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started at: ",PORT);  
        
    });
})

