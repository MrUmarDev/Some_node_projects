const fileUpload = require("express-fileupload");
const errorCheck = require("../checkFolders/middlewares/errorCheck");
const routers = require("../checkFolders/routers");

const modules = (app, express) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(fileUpload())
    app.use("/api", routers);
    app.use(errorCheck);
}

module.exports = modules;