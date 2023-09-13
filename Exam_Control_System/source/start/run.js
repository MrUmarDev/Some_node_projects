const { connect } = require("mongoose");
const config = require("../config");

const start = async (app) => {
    await connect(config.MongoUrl)
    app.listen(config.port, () => {
        console.log('Server is running on port:', config.port);
    });
}

module.exports = start;