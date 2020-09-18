// Using Node.js `require()`
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/myproject", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;

module.exports = db;