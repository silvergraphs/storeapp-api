/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Applications",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER(11),
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      logo: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      Category_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: {
            tableName: "Categories",
          },
          key: "id",
        },
      },
      User_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "Applications",
    }
  );
};
