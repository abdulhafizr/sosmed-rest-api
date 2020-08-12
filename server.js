require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./app/models/db");
const baseurl = require("./app/helper/baseurl");
const authRoutes = require("./app/routes/auth.routes");
const app = express();

db.mongoose
  .connect(baseurl.databaseurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to ${baseurl.databaseurl}`);
  })
  .catch((err) => {
    console.log(`Cannot connect to database because, ${err}`);
    process.exit();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
