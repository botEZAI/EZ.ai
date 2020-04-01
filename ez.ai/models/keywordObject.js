module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "object",
    {
      keyword: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false
      }
    },
    {
      timestamps: true,
      paranoid: true
    }
  );
