// require('dotenv').config();
// const express = require('express');
// const path=require('path')
// //config database
// const sql=require('mssql')
// const sqlConfig=require('./config/database');

// const {GetInFoDentist,GetInFoDentistByID}=require('./model/CURDService')
// // const configViewEngine=require('./config/viewengine');
// const app = express();
// const port =3000;

// // //config req.body
// // app.use(express.json())
// // app.use(express.urlencoded({extended:true}))

// app.use(express.static(path.join(__dirname, 'public')));
// //config template engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');


// app.get('/', (req, res) => {
//   const listUsers= GetInFoDentist()
//   return res.render('homepage.ejs',{listUsers:listUsers})  
// })
// app.get('/login', (req, res) => {
//   res.render('login.ejs')
// })
// app.get('/register', (req, res) => {
//   res.render('register.ejs')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


require('dotenv').config();
const express = require('express');
const configViewEngine=require('./config/viewengine');
const router=require('./routers/web');
const sql=require('mssql')
const sqlConfig=require('./config/database');
const app = express();
const session = require('express-session');
const port = process.env.PORT ||3000;
const hostname=process.env.HOST_NAME;
//const adminRoutes = require('./routers/adminRoutes');
//config req.body
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// Confif Session

//config template engine
configViewEngine(app);

// Cấu hình session
app.use(session({
  secret: 'dental',
  resave: false,
  saveUninitialized: true
}));

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/',router)
app.listen(port,hostname, () => {
  
  console.log(`Example app listening on port ${port}`)
})


