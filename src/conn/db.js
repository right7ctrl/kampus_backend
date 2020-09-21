const mongoose = require('mongoose');
module.exports = mongoose.connect("mongodb://localhost:27017/myproject", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
