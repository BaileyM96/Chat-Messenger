const mongoose = require('mongoose');

//This opens the connection to mongodb using mongoose
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb+srv://BaileyM:ygviCAqAmk66jHfE@cluster0.ohensmu.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

module.exports = mongoose.connection;