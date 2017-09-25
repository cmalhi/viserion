const Screenshot = require('url-to-screenshot');
const fs = require('fs');

// TODO - adjust dimensions

new Screenshot('http://localhost:8080/usertemplates/59a198e9c68734106591639a')
  .width(1080)
  .height(1920)
  .clip()
  .capture()
  .then(img => {
    console.log('img', img);
    fs.writeFileSync(__dirname + '/example2.png', img);
    console.log(__dirname + '/example2.png');
  });