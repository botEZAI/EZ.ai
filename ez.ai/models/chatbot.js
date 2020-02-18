module.exports = (sequelize, DataTypes) => (
    sequelize.define('chatbot', {
      type: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      latitude: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      longtitude: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    }, {
      timestamps: true,
      paranoid: true,
    })
  );
  