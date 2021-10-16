const fs = require('fs');
const xml2js = require('xml2js');
const util = require('util');
let val;
const parser = new xml2js.Parser();



fs.readFile('example.xml', (err, data) => {
    parser.parseString(data, (err, result) => {
        val = result;
        var obj = convertToObject(val);
        // val = util.inspect(result, false, null, true);
        jsWrite(obj)
    })
})

function jsWrite(data) {
    data = JSON.stringify(data, null, "\t");
    fs.writeFile('empty.json', data, (err) => { 
      
        // In case of a error throw err. 
        if (err) throw err; 
    }) 
}


function convertToObject(val){
    var types = val.Package.types;
    var obj = {};
    types.forEach(element => {
        obj[element.name] = element.members;
    });
    console.log(obj);
    return obj;
}