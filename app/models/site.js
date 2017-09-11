const mongoose = require('mongoose');

const siteSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  userId: String,
  html: String,
  screenshot: String,
  preferences: [{}],
});

const Site = mongoose.model('Site', siteSchema);

module.exports = Site;

var pref = [{
  "id": "hero24",
  "nickName": "My Hero",
  "componentName": "Hero",
  "attr": {
    "bgColor": "defaultColor",
    "title": "Title",
  },
},
{
  "id": "footer12",
  "nickName": "My Footer",
  "componentName": "Footer",
  "attr": {
    "bgColor": "defaultColor",
    "text": "Footer",
  },
}]

