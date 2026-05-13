const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 3000;
const DB = process.env.DB.replace("<PASSWORD>", process.env.PASSWORD);

mongoose.connect(DB).then(() => console.log("DB CONNECTED"));

app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});
