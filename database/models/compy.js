'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class compy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  compy.init({
    companyId: DataTypes.STRING,
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    tags: DataTypes.STRING,
    ceo: DataTypes.STRING,
    sector: DataTypes.STRING,
    score: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'compy',
  });
  return compy;
};