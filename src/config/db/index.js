const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://dinhphamcanh:dinhphamcanh400@cluster0.of6s6.mongodb.net/KMAONLINE?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
        });
        console.log('success');
    } catch(error) {
        console.log('failure');
    }
}

module.exports = { connect };