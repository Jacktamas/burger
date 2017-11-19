var db = require('../models');

module.exports = function(app){

  app.get('/', function(req, res){
    db.Burger.findAll({}).then(function(results){
      var devouredBurgers = [];
      var burgers = [];
      for(var i=0; i < results.length; i++){
        if(results[i].devoured){
          devouredBurgers.push(results[i]);
        }
        else if(results[i].devoured === false){
          burgers.push(results[i]);
        }
      }
      res.render("index", {burgers: burgers, devouredBurgers: devouredBurgers});

    }).catch(function(err){
      if(err){
        throw err;
      }
    })

  });

  app.post('/burgers', function(req, res) {
    db.Burger.upsert({
      burger_name: req.body.burger
    }).then(function(results){
      if(results){
        res.json(
          {
            burger_name: req.body.burger
          }
        );
      }
    });
  });

  app.put('/burgers/:id', function(req, res){
    var id = req.params.id;
    db.Burger.update({
      devoured: true
    },
    {
      where: {
        id: id
      }
    }).then(function(results){
      if(results[0] === 1){
        res.json(true);
      }
    });

  });
}
