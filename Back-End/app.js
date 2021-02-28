//import
const express = require('express'); //third party
const bodyParser = require('body-parser'); //core module
const adminroute = require('./route/admin_route');
const userroute = require('./route/user_route')
const menuroute = require('./route/menu_route')
const db = require('./database/database');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(adminroute);
app.use(menuroute);

app.use(userroute)


//localhost port
app.listen(100);