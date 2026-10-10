import express from "express";
import dotenv from "dotenv";
import memberRoutes from "./routes/memberRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({
    message: "Library Loan API is running",
    endpoints: {
      members: "/api/members",
      books: "/api/books",
      loans: "/api/loans",
    },
  });
});

app.use("/api/members", memberRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/loans", loanRoutes);

export default app;
