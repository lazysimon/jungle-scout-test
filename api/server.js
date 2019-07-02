const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product.route');

const app = express();
const PORT = 8080;
const routes = express.Router()

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/jungle-scout', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// routes
app.get('/ping', (req, res) => res.send('pong'));
app.use('/product', productRoutes)

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

