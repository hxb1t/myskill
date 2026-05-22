require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Middlewares
const authMiddleware = require("./middlewares/auth.middleware");
const errorHandler = require("./middlewares/error.middleware");
const requestLogger = require("./middlewares/request.middleware");

const { seedContentData, seedUserData, connectDB } = require("./config/db");

// Routes
const authRoute = require("./routers/auth.route");
const userRoute = require("./routers/user.route");
const fileRoute = require("./routers/file.route");

const app = express();

const allowedOrigins = (process.env.ALLOWED_DOMAIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend API is running",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend healthy",
  });
});

// Public Route
app.use("/auth", authRoute);

// Protected Auth Route
app.use("/user", authMiddleware, userRoute);
app.use("/file", authMiddleware, fileRoute);

// Global Error handler
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    await seedUserData();
    await seedContentData();

    const PORT = process.env.PORT || 8081;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Allowed CORS origins: ${allowedOrigins.join(", ")}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();
