const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Staff = sequelize.define('Staff', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Staff;
