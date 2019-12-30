var router = express.Router()

var account = require('./account.js');
app.use("/public/account", account)

var user = require('./user.js');
app.use("/public/user", user)

var product = require('./product.js');
app.use("/public/product", product)

module.exports = router