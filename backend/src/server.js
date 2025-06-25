import express from 'express';
import noteRoutes from './routes/noteRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import rateLimiter from './middleware/rateLimiter.js'; 
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

// middleware - allows to access the req.body 
app.use(express.json()); // this middleware parse JSON bodies: req.body
// our simple custom middlewear
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
app.use(rateLimiter);
    
app.use("/api/notes", noteRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started at: ",PORT);  
        
    });
})

