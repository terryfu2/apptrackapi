import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "./router";
import cors from "cors";
import dbConnection from "./database/dbConnection";

const session = require("express-session");
const path = require("path");

const app = express();
dotenv.config();

const port = process.env.NODE_PORT;

app.use(morgan("dev"));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

router(app);

app.post("/auth", function (request, response) {
  let email = request.body.email;
  let password = request.body.password;

  if (email && password) {
    dbConnection.query(
      "SELECT * FROM admins WHERE Email = ? AND Password = ?",
      [email, password],
      function (error, results, fields) {
        if (error) throw error;

        if (results.length > 0) {
          request.session.admin = true;
          request.session.loggedin = true;
          request.session.email = email;
          response.status(200).json({ email, admin: true });
          return;
        }

        dbConnection.query(
          "SELECT * FROM students WHERE email = ? AND password = ?",
          [email, password],
          function (error, results, fields) {
            if (error) throw error;

            if (results.length > 0) {
              request.session.admin = false;
              request.session.loggedin = true;
              request.session.email = email;
              response.status(200).json({ email, admin: false });
            } else {
              response.status(401).send("Incorrect Username and/or Password!");
            }
          }
        );
      }
    );
  } else {
    response.status(400).send("Please enter Username and Password!");
  }
});

app.get("/home", function (request, response) {
  // If the user is loggedin
  if (request.session.loggedin) {
    if (request.session.admin)
      response.send("(Admin) Welcome back, " + request.session.email + "!");
    else response.send("Welcome back, " + request.session.email + "!");
  } else {
    // Not logged in
    response.send("Please login to view this page!");
  }
  response.end();
});

app.get("/user/me", function (request, response) {
  if (request.session.loggedin) {
    response.json(request.session.email);
  }
  response.end();
});

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
