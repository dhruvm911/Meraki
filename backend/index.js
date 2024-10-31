import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from 'express-session';
import passport from 'passport';
import helmet from "helmet";
import morgan from "morgan";
import "./strategies/googleStrategy.js"
// import "./strategies/facebookStrategy.js"
import connectDB from "./utils/db.js";
import userRoute from "./routes/userRoutes.js";
import authRoute from "./routes/authRoutes.js";
import courseRoute from "./routes/courseRoutes.js";
import reviewRoute from "./routes/reviewRoutes.js";
import assignmentRoute from "./routes/assignmentRoutes.js";
import progressRoute from "./routes/progressRoutes.js";
import cartRoute from "./routes/cartRoutes.js";

dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret', 
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));

const port = process.env.PORT || 5000;

//apis
app.use("/api/v1/user",userRoute);
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/review",reviewRoute);
app.use("/api/v1/assignment",assignmentRoute);
app.use("/api/v1/progress",progressRoute);
app.use("/api/v1/cart",cartRoute);

app.listen(port,async () => {
    await connectDB();
    console.log(`Server started successfully on port ${port}`);
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});