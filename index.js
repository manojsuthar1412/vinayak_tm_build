require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const queryRoutes = require("./routes/query");
// const stripeRoutes = require("./routes/stripePayment");
// const brainTreeRoutes = require("./routes/brainTreePayment");

const app = express();

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(`ERROR: ${err}`));

//MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, "build")));

//PORT
const PORT = process.env.PORT || 8000;

//MY ROUTES
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", queryRoutes);
// app.use("/api", stripeRoutes);
// app.use("/api", brainTreeRoutes);

//Starting the server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
