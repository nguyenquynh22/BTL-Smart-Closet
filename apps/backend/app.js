require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const categoriesRouter = require("./routes/categories.route");
const itemsRouter = require("./routes/items.route");
const mannequinsRouter = require("./routes/mannequins.route");
const outfit_itemsRouter = require("./routes/outfit_items.route");
const outfit_schedulesRouter = require("./routes/outfit_schedules.route");
const outfitsRouter = require("./routes/outfits.route");
const usersRouter = require("./routes/users.route");

app.use("/api/categories", categoriesRouter);
app.use("/api/items", itemsRouter);
app.use("/api/mannequins", mannequinsRouter);
app.use("/api/outfit_items", outfit_itemsRouter);
app.use("/api/outfit_schedules", outfit_schedulesRouter);
app.use("/api/outfits", outfitsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  console.error("🔥 Server Error Details:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
