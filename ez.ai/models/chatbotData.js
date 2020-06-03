module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "chatbotData",
    {
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      botname: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      desc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      data: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false,
      },
      deployData: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      categories: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false,
      },
      platformInfo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
