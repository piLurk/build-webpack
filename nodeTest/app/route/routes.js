var Index = require('../controllers/index')


module.exports = function(app) {
  app.get('/',Index.index)

}