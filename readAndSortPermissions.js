const fs = require("fs");
const path = require("path");

const xml2js = require("xml2js");
const util = require("util");
const parser = new xml2js.Parser();
const builder = new xml2js.Builder();

const directoryPath = path.join(__dirname, "Permissions Old");
const directoryPath2 = path.join(__dirname, "Permissions");

const classAcc = "classAccesses";
const fieldAcc = "fieldPermissions";
const layoutAcc = "layoutAssignments";
const objAcc = "objectPermissions";
const recordTypeAcc = "recordTypeVisibilities";
const tabAcc = "tabVisibilities";

fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    readFiles(directoryPath + "/" + file, file);
  });
});

function readFiles(name, fileName) {
  fs.readFile(name, (err, data) => {
    parser.parseString(data, (err, result) => {
      let val;
      val = convertToObj(result.Access);
      val = sort(val);

      let obj = {
        Access: {},
      };
      obj.Access[Object.keys(result.Access)[0]] = val;

      console.log(fileName + " size : " + val.length);

      val = builder.buildObject(obj);
      jsWrite(val, fileName);
    });
  });
}

const convertToObj = (data) => {
  var obj = {};
  var items = data[Object.keys(data)[0]];
  items.forEach((item) => {
    switch (Object.keys(data)[0]) {
      case classAcc:
        obj[item.apexClass] = item;
        break;
      case fieldAcc:
        obj[item.field] = item;
        break;
      case layoutAcc:
        obj[item.layout] = item;
        break;
      case objAcc:
        obj[item.object] = item;
        break;
      case recordTypeAcc:
        obj[item.recordType] = item;
        break;
      case tabAcc:
        obj[item.tab] = item;
        break;
    }
  });
  return obj;
};

function jsWrite(data, name) {
  // data = JSON.stringify(data,null,'\t');
  fs.writeFile(directoryPath2 + "/" + name, data, function (err) {
    if (err) throw err;
    console.log("Updated! " + name);
  });
}

function sort(maxSpeed) {
  var sortable = [];
  for (var vehicle in maxSpeed) {
    sortable.push([vehicle, maxSpeed[vehicle]]);
  }

  sortable.sort(function (a, b) {
    return (a[0] > b[0]) - (b[0] > a[0]);
  });

  var out = [];
  sortable.forEach((item) => {
    out.push(item[1]);
  });

  return out;
}
