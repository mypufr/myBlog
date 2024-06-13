import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=> {
  console.log("MongoDB is connected");
  })
  .catch((err)=> {
    console.log(err);
  });

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.listen(3000, () =>{
  console.log("Server is runing on port 3000");
});

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)


app.use((err, req, res, next)=>{
  const statusCode = err.statuscode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success:false,
    statusCode,
    message,
    errorMessageTest: "I come from indexJS"
  });
});