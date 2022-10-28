const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { dbConnection } = require("./db/dbCon");
const journeyRoutes = require("./routes/journeyRoutes");
const userRouter = require("./routes/userRoutes");
const paymentRoutes = require("./routes/payementRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/journey", journeyRoutes);
app.use("/payment", paymentRoutes);
app.use("/delivery", deliveryRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  dbConnection();
  console.log(`Server is running on port ${PORT}`);
});
