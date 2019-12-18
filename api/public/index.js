var router = express.Router()

var account = require('./account.js');
app.use("/public/account", account)



module.exports = router