var router = express.Router()

var account = require('./account.js');
app.use("/account", account)

var user = require('./user.js');
app.use("/user", user)

module.exports = router