const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('proiect_colectiv', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,  // Specifică portul 3306
});

module.exports = sequelize;
