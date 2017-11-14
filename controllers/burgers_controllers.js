var Burger = require('../models/burger.js');

module.exports = function(app){

  app.get('/', function(req, res){
    Burger.selectAll(`burgers`, function(results){
      var devouredBurgers = [];
      var burgers = [];
      for(var i=0; i < results.length; i++){
        if(results[i].devoured){
          devouredBurgers.push(results[i]);
        }
        else if(! results[i].devoured){
          burgers.push(results[i]);
        }
      }
      res.render("index", {burgers: burgers, devouredBurgers: devouredBurgers});
    });
  });

  app.post('/burgers', function(req, res) {
    Burger.insertOne([''+req.body.burger+'', false], function(results){
      if(results.insertId){
        res.json(
          {
            id: results.insertId,
            burger_name: req.body.burger
          }
        );
      }
    });
  });
  app.put('/burgers/:id', function(req, res){
    var id = req.params.id;
    Burger.updateOne(true, id, function(results){
      if(results.affectedRows === 1){
        res.json(true)
      }
    });

  });
}
