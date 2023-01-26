const Sequelize = require('sequelize');
const Member = require('./member');
const Article = require('./article');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Member = Member;
db.Article = Article;

Article.init(sequelize);
Member.init(sequelize);

Article.associate(db);
Member.associate(db);

module.exports = db;