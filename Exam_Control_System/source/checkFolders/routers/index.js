const adminRouter = require("./adminRoute");
const examRouter = require("./examRoute");
const groupRouter = require("./groupRoute");
const studentRouter = require("./studentRoute");
const studentGroupRouter = require("./StdGrpRoute");
const resultRouter = require("./resultRoute");


module.exports = [adminRouter, examRouter, groupRouter, studentRouter, studentGroupRouter, resultRouter];