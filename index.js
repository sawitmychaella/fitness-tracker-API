const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user");
const workoutRoutes = require("./routes/workout");

// [SECTION] Environment Setup
require("dotenv").config();

// [SECTION] Server Setup
const app = express();

// Database Connection
mongoose.connect(process.env.MONGODB_STRING);

const db = mongoose.connection;

db.on('error', (err) => console.error('MongoDB connection error:', err));
db.once('open', () => console.log('Connected to MongoDB Atlas!'));

const corsOption = {
    origin: [
        "http://localhost:8000"
    ],
    credentials: true,
    optionsSuccessStatus: 200
}

// [SECTION] Middlewares
app.use(express.json());
app.use(cors(corsOption));

// [SECTION] Routes
app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

// [SECTION] Server Listening
if(require.main === module) {

    app.listen(
        process.env.PORT || 4000,
        () => console.log(
            `API is now online on port ${process.env.PORT || 3000}`
        )
    );

};

module.exports = { app, mongoose };