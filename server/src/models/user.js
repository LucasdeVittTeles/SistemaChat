const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        gender: DataTypes.STRING,
        age: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = User;
