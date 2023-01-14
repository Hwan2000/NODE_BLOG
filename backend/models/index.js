const Sequelize = require('sequelize');
const Member = require('./member');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Member = Member;

Member.init(sequelize);

Member.associate(db);

module.exports = db;