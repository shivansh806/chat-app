import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoutes.js';
import contactsRoutes from './routes/ContactsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const databaseUrl = process.env.DATABASE_URL;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}))

app.use("/uploads/profile", express.static("uploads/profile"))

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/contacts", contactsRoutes)


const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})


mongoose.connect(databaseUrl).then(() =>console.log("DB is connected succesfully")).catch((err) => console.log(err))

