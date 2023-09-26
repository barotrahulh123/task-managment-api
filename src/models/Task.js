const { Sequelize, Model } = require('sequelize');

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.TEXT,
        userId: Sequelize.INTEGER,
        status: {
          type: Sequelize.ENUM('open', 'completed', 'in-progress'),
          defaultValue: 'open',
        },
      },
      {
        sequelize,
        timestamps: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
    });
  }
}

module.exports = Task;
