require('dotenv').config()
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const hbs = require("hbs");
// const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');


require("./db/conndb");

// const Register = require('./models/register');
const register = require("./models/register");

// port number
const port = process.env.PORT || 3000;


const app = express();
const files = path.join(__dirname, "../");
app.use(express.static(files + "/public"));

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }));

// using hbs as templating engine
app.set("view engine", "hbs");
app.set("views", "../templates/views");
hbs.registerPartials("../templates/partials");

// Express Endpoints
app.get("/", (req, res) => {
  // res.sendFile(files+'/public/index.html')
  res.render("index");
});
app.get("/login", (req, res) => {
  // res.sendFile(files+'/public/login.html')
  res.render("login");
});

app.get("/signup", (req, res) => {
  // res.sendFile(files+'/public/signup.html');
  res.render("signup");
});
app.get("*", (req, res) => {
  res.render("404", {
    errorcomment: "page not found",
  });
});
app.post("/register", async (req, res) => {
  // console.log(req.body);

  try {
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    if (password === confirmpassword) {
      const appUser = new register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password,
      });
      // console.log(appUser);
      const token = await appUser.generateAuthToken();
      // console.log('appUser after token code', token);
      // console.log(token);
      // registered = await appUser.save();
      // await appUser.remove({firstname: prince});
      // console.log('working');
      res.status(201).render('dashboard',{
        username: req.body.firstname + req.body.lastname
      });
      console.log('registration completed');
    } else {
      // console.log('not correct')
      res.send("password and confirm password should match.");
    }
  } catch (e) {
    console.log(e);
    console.log('to do something good')
    res.status(400).send('error loading site');
  }
});

app.post("/login", async (req, res) => {
  // console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;
  // const users = await register.find();
  try {
    const user = await register.findOne({ email: email });

    console.log(user);
    const isMatch = await bcrypt.compare(password,user.password);
    // const token = await user.generateAuthToken();

    console.log(isMatch)
    if (isMatch) {
    const token = await user.generateAuthToken();
      // await user.save()
      res.end(JSON.stringify(user));
      // res.status(200).sendFile(files+'/public/login.html')
    } else {
      res.status(400).send("Invalid login details");
    }
  } catch (error) {
    res.status(400).send(`Invalid login details`);
  }

  // const appUsers = require('./models/login');

  // console.log(appUsers);
});

// const crateToken = async() => {
//   secretKey = "youthavaeonlaseohlnebdonealmehahveunoaye";
//   // const token = await jwt.sign({_id:"637fc2b18b23287e4bf7bdd2"},secretKey,{
//   //   expiresIn: "1 second"
//   // });
//   // console.log(token);
//   const userVer = await jwt.verify(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzgwOTdiM2NmNjVhOWViNjk0NzVhZDEiLCJpYXQiOjE2NjkzNzE4Mjd9.fzreWEsrp2LRm6YlzS_2_vBg0eiBiRu4GK_Y3nqSAU0",
//     secretKey
//   ); 

//   console.log(userVer);

// }

// crateToken();
app.listen(port, () => {
  console.log(`App is running on port 3000`);
});

// const os = require('os');
// const totalMemory = os.totalmem();
// console.log(`${totalMemory/1024/1024/1024}`);
// const freeMemory = os.freemem();
// console.log(`${freeMemory/1024/1024/1024}`)
