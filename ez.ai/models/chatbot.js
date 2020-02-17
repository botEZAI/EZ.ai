module.exports = (sequelize, DataTypes) => (
    sequelize.define('chatbot', {
      keyword: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
      },
      type: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    }, {
      timestamps: true,
      paranoid: true,
    })
  );
  