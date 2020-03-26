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
      category:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
      //리스트 개수를 나타냄 
      contentLen:{
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      question:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
      elem1:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
      elem2:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
      elem3:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
      elem4:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
      elem5:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
      elem6:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
    }, {
      timestamps: true,
      paranoid: true,
    })
  );
  