const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Ticket = sequelize.define('Ticket', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'open'
  }
});

module.exports = Ticket;
