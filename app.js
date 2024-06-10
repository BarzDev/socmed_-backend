const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./utils/connectDB");
const { apiKeyAuth } = require("@vpriem/express-api-key-auth");
const cors = require("cors");
const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT"],
};

const apiKey = process.env.API_KEY;

app.use(cors(corsConfig));
app.use(apiKeyAuth([apiKey]));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", require("./routes/user"));
app.use("/register", require("./routes/register"));
app.use("/posting", require("./routes/posting"));

// Middleware
app.use((err, req, res, next) => {
  if (err && err.message === "Unauthorized") {
    res.status(401).json({ message: "Unauthorized need api key" });
  } else {
    next(err);
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
