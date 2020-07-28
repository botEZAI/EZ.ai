module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "history",
    {
      history: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
