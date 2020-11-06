const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("uncaughtException__shutting down the app");
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const db = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connected successfully..!");
  });

const port = process.env.PORT || 4001;
const server = app.listen(port, () => {
  console.log(`App is running on port: ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("unhandled rejection shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
