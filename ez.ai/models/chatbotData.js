module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "chatbotData",
    {
      user: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      botname: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      sns: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      desc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      token: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      data: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
