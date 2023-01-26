const Sequelize = require('sequelize');

class Memeber extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
              },
              email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
              },
              password: {
                type: Sequelize.STRING,
                allowNull: false
              },
              nickname: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
              },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Member',
            tableName:'members',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    }
    static associate(db) {
      db.Member.hasMany(db.Article, {foreignKey:'writer', sourceKey:'id', allowNull:false});
    }
}

module.exports = Memeber;