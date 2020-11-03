//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { createProxyMiddleware }  = require('http-proxy-middleware');

const { routes } = require('./config.json');



const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

// mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});
// mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema ({
  email: String,
  password: String
});

const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res){
    res.render("home");
  });

app.get("/login", function(req, res){
res.render("login");
});

app.get("/register", function(req, res){
    res.render("stream");
  });

  app.post("/register", function(req, res){

    res.render("stream");

    // background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.or…2-.9%202-2V8l-6-6H6zm7%207V3.5L18.5%209H13z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E), 
    // url(chrome://resources/images/arrow_down.svg);

    // const newUser = new User({
    //     email: req.body.username,
    //     password: req.body.password
    // });

    // newUser.save(function(err){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         res.render("secrets");
    //     }
        
    //});
  
  });

  for (route of routes) {
    app.use(route.route,
      createProxyMiddleware({
            target: route.address,
            pathRewrite: (path, req) => {
                return path.split('/').slice(2).join('/'); // Could use replace, but take care of the leading '/'
            }
        })
    );
}

app.listen(80, function() {
    console.log("Server started on port 80.");
  });
  