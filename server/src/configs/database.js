require("dotenv").config();

module.exports = {
  database: process.env.MYSQL_DATABASE,
  dialect: process.env.MYSQL_DIALECT,
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  define: {
    timestamps: process.env.TIMESTAMPS,
  },
};
