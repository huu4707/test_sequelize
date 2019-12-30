function MediaModel(sequelize, type) {
    return sequelize.define('media', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type: { type: type.STRING,  allowNull: false }, //video hay image
      url: { type: type.STRING,  allowNull: false },
      thumbnail: { type: type.STRING,  allowNull: false },
    })
  }
  
  module.exports = {
    MediaModel
  }