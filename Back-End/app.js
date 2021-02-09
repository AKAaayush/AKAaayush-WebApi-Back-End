//import
const express = require('express'); //third party
const bodyParser = require('body-parser'); //core module
const adminroute = require('./route/admin_route')

const app = express();

app.use(express.json());
app.use(adminroute);
app.use(bodyParser.urlencoded({extended:false}));

//localhost port
app.listen(100);