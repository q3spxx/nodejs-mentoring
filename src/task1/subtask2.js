import csv from "csvtojson";
import path from "path";
import fs from "fs";

const writeStream = fs.createWriteStream(path.resolve(__dirname, "res/nodejs-hw.txt"));

csv()
  .fromFile(path.resolve(__dirname, "res/nodejs-hw.csv"))
  .then((data) => {
    data.forEach((book) => {
      writeStream.write(`${JSON.stringify(book)}\n`);
    });

    console.log("File nodejs-hw.txt has been wrote. You can find it in dist/res/nodejs-hw.txt");
  });
