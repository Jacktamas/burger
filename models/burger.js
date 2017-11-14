var orm = require('../config/orm.js');
module.exports = {
  selectAll: function(tableName, cb){
    orm.selectAll(tableName, cb);
  },
  insertOne: function(burgerVals, cb){
    orm.insertOne(`burgers`, ['`burger_name`', '`devoured`'], burgerVals, cb);
  },
  updateOne: function(boolean, id, cb){
    orm.updateOne(`burgers`, {devoured: boolean}, id, cb);
  }
}
