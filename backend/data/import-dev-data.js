const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Item = require("./../models/itemModel");

dotenv.config({ path: "./config.env" });

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

const data = JSON.parse(fs.readFileSync(`./data/items.json`, "utf-8"));

const importData = async () => {
  try {
    await Item.create(data);
    console.log("Data imported successfully..!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
const deleteData = async () => {
  try {
    await Item.deleteMany();
    console.log("Data delted suyccessfully..!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
