const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const app = express();
const PORT = 8080;
const productRoutes = require('./routes/product.route');

app.use(cors());
app.use(bodyParser.json());

console.log('Current environment:', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'test'){
    mongoose.connect('mongodb://127.0.0.1:27017/jungle-scout-test', { useNewUrlParser: true });
} else {
    mongoose.connect('mongodb://127.0.0.1:27017/jungle-scout', { useNewUrlParser: true });
}

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// routes
app.get('/ping', (req, res) => res.send('pong'));
app.use('/api', productRoutes)

const server = app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});


module.exports = server;