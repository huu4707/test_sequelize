function SpecificationModel(sequelize, type) {
    return sequelize.define('specification', { // thong số kỹ thuật
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      key: { type: type.STRING,  allowNull: false },
      value: type.STRING,
    })
  }
  
  module.exports = {
    SpecificationModel
  }