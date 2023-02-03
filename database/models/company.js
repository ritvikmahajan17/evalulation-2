'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  company.init({
    companyId: DataTypes.STRING,
    name: DataTypes.STRING,
    tags: DataTypes.STRING,
    ceo: DataTypes.STRING,
    numEmployee: DataTypes.STRING,
    sector: DataTypes.STRING,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'company',
  });
  return company;
};