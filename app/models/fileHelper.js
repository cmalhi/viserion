const db = require('../../config/database');
const File = require('./file.js');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const root = path.dirname(require.main.filename);

const filesPath = __dirname + '/../pages/files';

// Read all files in 'pages/files' dir
fs.readdirAsync(filesPath)
  .then((files) => {
    // Get file names
    return { filenames: files, filePromises: files.map((file) => fs.readFileAsync(filesPath + '/' + file, 'utf8')) };
  })
  .then(({ filenames, filePromises }) => {
    Promise.all(filePromises)
      .then(fileBodies => {
        Promise.each(filenames, (file, i) => {
          var fileDoc = {name: file, body: fileBodies[i] };
          File.findOneAndUpdate(
            { name: file },
            fileDoc,
            { upsert: true, new: true })
            .exec(function(err, file){
              if (err) console.log('err', err);
            })
            .then(result => console.log('res', result))
            .catch(err => console.log(err))
        })
      })
      .catch(err => console.log(err))
  })
  .catch(err => console.error('Err reading files ', err));



