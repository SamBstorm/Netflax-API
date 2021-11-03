const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnect = require('./connection/dbConnect');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(cors());

const routes = require('./routes/routes')(app);

const server = app.listen(port,
    () => {
        console.log('Le server écoute les requêtes du port %s',port);
        dbConnect;
    });