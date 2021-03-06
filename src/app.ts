require("express-async-errors");
import cors from 'cors';
// const winston = require('winston');
import createError, { HttpError } from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import logger from "morgan";

// import indexRouter from "./routes/index";
import contactRouter from "./routes/contact";

const app = express();

// winston.add(winston.transport.File, { filename: 'logfile.log' });

// view engine setup
app.set("views", path.join(__dirname, "../", "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../", "public")));
app.use(cors());

// app.use("/", indexRouter);
app.use("/contacts", contactRouter);

// catch 404 and forward to error handler
app.use(function(_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function(
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // winston.error(err.message, err)
  res.status(500).send({
    error: err.message
  })
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render("error");
});

export default app;
