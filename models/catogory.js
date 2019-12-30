function CatogoryModel(sequelize, type) {
    return sequelize.define('catogory', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: { type: type.STRING,  allowNull: false },
      slug: { type: type.STRING,  allowNull: false },
      description: type.STRING,
    })
  }
  
  module.exports = {
    CatogoryModel
  }