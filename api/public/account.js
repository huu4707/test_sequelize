var router = express.Router()
var { User } = require('../../sequelize.js');
const Joi = require('joi');
const { createHash, compare } = require('../../lib/bcrypt');
const { reponseAPI } = require('../../lib/responseAPI');
const { createToken } = require('../../lib/jwt');
const passport = require('passport')

function validate(body) {
    return new Promise((resolve, reject) => {
        const schema = Joi.object().keys({
            name: Joi.string().alphanum().min(3).max(30),
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        }).with('username', 'password');
        Joi.validate(body, schema, function (err, value) {
            if(err) {
                reject(err)
            } else{
                resolve(value);
            }
        });
    })
}

router.post('/register', async (req, res) => {
    try {
        await validate(req.body);
        let checkUsername = await User.findOne({ where: { username: req.body.username} });
        if(checkUsername) {
             let result = reponseAPI({status: false, message: "username is exits",data: []})
             return res.send(result);
        }
        req.body.password = await createHash(req.body.password);
        User.create(req.body)
        .then(user => {
            delete user.dataValues.password;
            let result = reponseAPI({status: true, message: "success",data: user})
            return res.send(result);
        })
    } catch (error) {
        let result = reponseAPI({status: false, message: error.message,data: []})
        return res.send(result);
    }
})

router.post('/login', async (req, res) => {
    try {
        await validate(req.body);
        let user = await User.findOne({ where: { username: req.body.username} });
        if(!user) {
             let result = reponseAPI({status: false, message: "username or password is vaild",data: []})
             return res.send(result);
        }
        await compare(req.body.password, user.dataValues.password);
        user.dataValues.token = await createToken({id: user.id});
        delete user.dataValues.password;
        let result = reponseAPI({status: true, message: "Success",data: user})
        return res.send(result);
    } catch (error) {
        let result = reponseAPI({status: false, message: error.message,data: []})
        return res.send(result);
    }
})

router.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));

router.get('/auth/facebook/callback',
	  passport.authenticate('facebook', { successRedirect : '/', failureRedirect: '/login' }),
	  function(req, res) {
        res.redirect('/');
});
module.exports = router
