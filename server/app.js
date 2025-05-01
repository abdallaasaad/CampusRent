require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dataBaseConnection = require("./connections/dataBaseConnection");
const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");

const app = express();
app.use(cors());
app.use(express.json());

dataBaseConnection();

app.use("/users", userRoutes);
app.use("/cards", cardRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
