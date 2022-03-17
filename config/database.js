const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Matt-B312:Matt2038@mongodbcluster.wejl1.mongodb.net/mongoose-flights?retryWrites=true&w=majority',
{ useNewUrlParser: true}
);

// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});