const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth");
const departmentsRoutes = require("./routes/departments");
const employeesRoutes = require("./routes/employees");

const app = express();

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://workforce-pro-phi.vercel.app"
];

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentsRoutes);
app.use("/api/employees", employeesRoutes);

const PORT = process.env.PORT || 8095;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
