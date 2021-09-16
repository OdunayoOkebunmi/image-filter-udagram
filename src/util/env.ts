import dotenv from "dotenv";
dotenv.config();


const env = {
  jwt_secret: process.env.JWT_SECRET,
  salt_rounds: process.env.SALT_ROUNDS || 10,
  username: process.env.SEQUELIZE_USR,
  password: process.env.SEQUELIZE_PWD,
  database: process.env.SEQUELIZE_DB,
  host: process.env.SEQUELIZE_HOST

}
export default env;