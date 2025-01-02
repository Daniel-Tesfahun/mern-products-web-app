import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import ProductRoutes from './routes/ProductRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Define the current directory
const __dirname = path.resolve();

// Middlewares 
app.use(express.json()); // Allow us to accept JSON data in the body.req

// Routes
app.use("/api/products", ProductRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server is listening on port " + PORT);
});

// 09ttdF4DdpiAC7jx