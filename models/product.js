function ProductModel(sequelize, type) {
    return sequelize.define('product', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: { type: type.STRING,  allowNull: false },
      slug: { type: type.STRING,  allowNull: false },
      model: { type: type.STRING,  allowNull: false },
      type: { type: type.INTEGER,  allowNull: false }, //loai máy. 1 là 1 chiều, 2 là 2 chiều
      isInverter: { type: type.BOOLEAN,  allowNull: false }, // true có inverter, false k Inverter
      wattage: type.DOUBLE, // công suất 1 , 2 ... đơn vi là HP
      volume: type.DOUBLE, // Thể tích phòng sử dụng đơn vị m2
      price: { type: type.DOUBLE,  allowNull: false },
      image: { type: type.STRING,  allowNull: false },
      description: type.STRING, // mô tả Ckedior
      tag: type.STRING, // giam giá || Hot || new
      feature: type.STRING,  //Tính năng
      function: type.STRING, //chức năng
      parent: type.INTEGER, // để biết sản phẩm nào cùng loại
    })
  }
  
  module.exports = {
    ProductModel
  }