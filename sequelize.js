const Sequelize = require('sequelize')
const { UserModel } = require('./models/user')
const { ForgotPasswordModel } = require('./models/forgot_password')
const { CatogoryModel } = require('./models/catogory')
const { ProductModel } = require('./models/product')
const { MediaModel } = require('./models/media')
const { SpecificationModel } = require('./models/specification')
const config = require('./config.json')
const slug = require('slug');

const sequelize = new Sequelize(config.VAR_DATABASE, config.VAR_USER, config.VAR_PASSWORD, {
  host: config.VAR_HOST,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const User = UserModel(sequelize, Sequelize)
const ForgotPassword = ForgotPasswordModel(sequelize, Sequelize)
const Catogory = CatogoryModel(sequelize, Sequelize)
const Product = ProductModel(sequelize, Sequelize)
const Media = MediaModel(sequelize, Sequelize)
const Specification = SpecificationModel(sequelize, Sequelize)

ForgotPassword.belongsTo(User); //tao userId trong blog
Product.belongsTo(Catogory); //tao userId trong blog
Media.belongsTo(Product); //tao userId trong blog
Specification.belongsTo(Product); //tao userId trong blog


sequelize.sync({ force: false })
  .then(async () => {
    await initCatogory();
    console.log(`Database & tables created!`)
  })

async function initCatogory() {
    if(await Catogory.count({})==0) {
      let name0 = "Loại hai dàn rời";
      let slug0 = slug(name0);
      let name1 = "Loại multi";
      let slug1 = slug(name1);
      let name2 = "Máy lọc không khí";
      let slug2 = slug(name2);
      let name3 = "Điều khiển thông minh";
      let slug3 = slug(name3);
      let name4 = "Điều hoà thương mại";
      let slug4 = slug(name4);
      let dataInput= [{name: name0, slug: slug0},{name: name1, slug: slug1},{name: name2, slug: slug2},{name: name3, slug: slug3},{name: name4, slug: slug4}]
      await Catogory.bulkCreate(dataInput);
    }
}

module.exports = {
  User,
  ForgotPassword,
  Catogory,
  Product,
  Media,
  Specification
}