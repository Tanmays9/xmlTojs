const fs = require('fs');
const xml2js = require('xml2js');

const xmlObject = {
    tanmau : 'test'
}
const builder = new xml2js.Builder();
const xml = builder.buildObject(xmlObject);
console.log(xml);
const val = (xml) =>  {
    fs.writeFile('empty.json', xml, (err) => { 
      
        // In case of a error throw err. 
        if (err) throw err; 
    }) 
}
val(xml);