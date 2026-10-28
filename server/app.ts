require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import { rateLimit } from 'express-rate-limit';

//body parser
app.use(express.json({ limit: "50mb" }));

//cookie parser
app.use(cookieParser());

//cors => cross origin resource sharing
app.use(
  cors({
    // Danh sách domain frontend được phép gọi API, cấu hình trong .env (CLIENT_URL, phân tách bằng dấu phẩy)
    origin: (process.env.CLIENT_URL || 'http://localhost:3000').split(',').map((u) => u.trim()),
    credentials: true,
  }),
);

// api requests limit to protect against DDoS
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});

//routes — Sprint 1: xác thực, phân quyền, hồ sơ (US-01 → US-06)
app.use("/api/v1/", userRouter);

//testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API đang hoạt động",
  });
});

//unknown route
app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(limiter);
app.use(ErrorMiddleware);