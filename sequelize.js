const Sequelize = require('sequelize')
const { UserModel } = require('./models/user')
const { BlogModel } = require('./models/blog')
const { TagModel } = require('./models/tag')
const config = require('./config.json')

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
const BlogTag = sequelize.define('blog_tag', {})
const Blog = BlogModel(sequelize, Sequelize)
const Tag = TagModel(sequelize, Sequelize)

Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
Tag.belongsToMany(Blog, { through: BlogTag, unique: false })

Blog.belongsTo(User); //tao userId trong blog

sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  Blog,
  Tag
}