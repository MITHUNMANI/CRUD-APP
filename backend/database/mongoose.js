const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://mithunsdb:mithunsdb@mithunscluster-c0yos.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('Database'))
    .catch((error) => console.log(error));

module.exports = mongoose;