module.exports = (sequelize, DataTypes) => (
    sequelize.define('object', {
        keyword: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: false,
      },
    }, {
      timestamps: false,
      paranoid: false,
    })
  );
  