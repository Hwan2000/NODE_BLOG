const Sequelize = require('sequelize');

class Article extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            contents: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            likes: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            dislikes: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            comments_count: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            writer: {
                type: Sequelize.STRING,
                allowNull: false,
                references: { model: 'members', key: 'nickname' }
            },
            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            }
        },
        {
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Article',
            tableName:'articles',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db) {
        db.Article.belongsTo(db.Member, {foreignKey:'writer', targetkey:'nickname', allowNull:false});
    }
}

module.exports = Article;