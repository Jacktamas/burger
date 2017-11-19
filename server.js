var bodyParser = require("body-parser");
var express = require('express');
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 3000;
var app = express();
const db = require("./models");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

require('./controllers/burgers_controllers.js')(app);

db.sequelize.sync().then(function(){
  app.listen(PORT, function() {
  });
});
