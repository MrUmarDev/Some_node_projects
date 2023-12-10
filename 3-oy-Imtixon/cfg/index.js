require("dotenv/config");
const {env} = process;

const config = {
    port:env.PORT,
    db:env.DB_URL,
    jwtsecret:env.JWTSECRET
};

module.exports = config