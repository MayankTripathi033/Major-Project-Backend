import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { Register, login } from "./Controllers/auth.js";
import { createPost } from "./Controllers/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { verifyToken } from "./middleware/auth.js";
import Post from "./models/Post.js";
import User from "./models/User.js";
import { posts, users } from "./data/index.js";
import colors from "colors";

/* Dotenv*/
dotenv.config();

/*Configuration*/
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/*File Storage*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/*File Routes*/
app.post("/auth/register", upload.single("picture"), verifyToken, Register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);
// app.post("/auth/register", upload.single("picture"), verifyToken, login);

/* Routes */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/*Moongoose Setup */
const PORT = process.env.PORT || 6001;
console.log(process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        colors.yellow(
          `Database is Connected: ${process.env.MONGO_URL} PORT: ${PORT}`
        )
      )
    );
    /*One time data insertion */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });
