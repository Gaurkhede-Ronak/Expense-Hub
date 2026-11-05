import express, {urlencoded} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000" , process.env.CLINT_URL],
    credentials: true,
}));

app.use(express.json({
    limit: "16kb"
}));

app.use(urlencoded({
    extended: true,
    limit: "16kb"
}));

app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import transactionRouter from "./routes/transactions.routes.js";
import partymassterRouter from "./routes/partymaster.routes.js";
import budgetsRouter from "./routes/budgets.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/partymaster", partymassterRouter);
app.use("/api/budgets", budgetsRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        statusCode,
        success: false,
        message,
        error: err.error || []
    });
});

export { app };
