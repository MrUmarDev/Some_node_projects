require("dotenv").config();
const { env } = process;

const config = {
    port: env.PORT,
    MongoUrl: env.DB_URL,
    jwtKey: env.JWT_KEY
}

module.exports = config;