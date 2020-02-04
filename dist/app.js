"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
// const winston = require('winston');
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
// import indexRouter from "./routes/index";
const contact_1 = __importDefault(require("./routes/contact"));
const app = express_1.default();
// winston.add(winston.transport.File, { filename: 'logfile.log' });
// view engine setup
app.set("views", path_1.default.join(__dirname, "../", "views"));
app.set("view engine", "jade");
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../", "public")));
app.use(cors_1.default());
// app.use("/", indexRouter);
app.use("/contacts", contact_1.default);
// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, _req, res, _next) {
    // winston.error(err.message, err)
    res.status(500).send({
        error: err.message
    });
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    // res.status(err.status || 500);
    // res.render("error");
});
exports.default = app;
//# sourceMappingURL=app.js.map