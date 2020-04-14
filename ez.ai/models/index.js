const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config", "config.json"))[
  env
];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Chatbot = require('./chatbot')(sequelize, Sequelize);
db.Keyword = require('./keyword')(sequelize, Sequelize);
db.ChatbotData = require('./chatbotData')(sequelize, Sequelize);


//1:N 관계 키워드는 1개 데이터는 여러개 가능
db.Keyword.hasMany(db.Chatbot, { foreignKey: 'keyworder', sourceKey: 'id' });
db.Chatbot.belongsTo(db.Keyword, { foreignKey: 'keyworder', targetKey: 'id' });

//1:N 관계 유저와 챗봇 (한 챗봇에 여러 명이 사용하려면, N:M으로 바꿔야함 )
db.User.hasMany(db.ChatbotData, {foreignKey: 'user_id', sourceKey:'id'});
db.ChatbotData.belongsTo(db.User,{foreignKey: 'user_id', sourceKey:'id'});

module.exports = db;
