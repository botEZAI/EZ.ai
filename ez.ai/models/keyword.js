module.exports = (sequelize, DataTypes) => (
    sequelize.define('keyword', {
      keyword: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
      },
    }, {
      timestamps: true,
      paranoid: true,
    })
  );
  