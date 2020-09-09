/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Applications', {
    idApplication: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Category_idCategory: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: {
          tableName: 'Categories',
        },
        key: 'idCategory'
      }
    },
    User_idUser: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'idUser'
      }
    }
  }, {
    sequelize,
    tableName: 'Applications'
  });
};
