const readline = require('readline');
const fs = require('fs');
var jsonfile = require('jsonfile');


var url_natio = {}



let asyncBlockOfDescriptiveLocation = new Promise((resolve, reject) => {

  const rl = readline.createInterface({
    input: fs.createReadStream('id-country_origin.txt')
  });


  rl.on('line', function(line) {
    url_natio[line.split("\t")[0]] = line.split("\t")[1]
  });
  rl.on('close', function() {
    resolve("Success!")
  });
});




Promise.all([asyncBlockOfDescriptiveLocation]).then(values => {
  //  console.log(url_natio);
  data = jsonfile.readFileSync("data.json")
  data.forEach(function(entity) {
    entity.origin = "unknown"
    entity.origin = url_natio[entity.work_area]

  })

  jsonfile.writeFileSync("data_new.json", data, {spaces: 2});


});
