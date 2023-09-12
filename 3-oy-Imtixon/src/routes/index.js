const authRouter = require("./auth.route");
const studentRouter = require("./student.route");
const teacherRouter = require("./teacher.route");

module.exports = [
    authRouter,
    studentRouter,
    teacherRouter,
];