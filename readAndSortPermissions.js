const fs = require("fs");
const path = require("path");

const xml2js = require("xml2js");
const util = require("util");
const parser = new xml2js.Parser();

const directoryPath = path.join(__dirname, "Permissions Old");
const directoryPath2 = path.join(__dirname, "Permissions");

fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    console.log(file);
    readFiles(directoryPath + "/" + file, file);
  });
});

function readFiles(name, fileName) {
  console.log(name);
  fs.readFile(name, (err, data) => {
    parser.parseString(data, (err, result) => {
      let val;

      val = convertToObj(result.Access);
        name = fileName.replace("xml", "json");
      jsWrite(val, name);
    });
  });
}

const convertToObj = (data) => {
  var items = data[Object.keys(data)[0]];
  items.forEach((item) => {
    console.log(item);
  });
  return items;
};

function jsWrite(data, name) {
  data = JSON.stringify(data, null, "\t");
  fs.appendFile(directoryPath2 + "/" + name, data, function (err) {
    if (err) throw err;
    console.log("Updated! " + name);
  });
}
