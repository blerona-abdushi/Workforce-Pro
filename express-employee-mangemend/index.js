const  express = require("express")
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth")
const departmentsRoutes = require("./routes/departments")
const employeesRoutes = require("./routes/employees")

const app = express();


app.use(cors({origin: "http://localhost:5173"}));

app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/departments", departmentsRoutes)
app.use("/api/employees", employeesRoutes)

const PORT = process.env.PORT || 8095;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    
})

