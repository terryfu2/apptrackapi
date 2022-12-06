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
  const password = crypt("salt", request.body.password);

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

app.delete("/logout", function (req, res) {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("Unable to log out");
      } else {
        res.send("Logout successful");
      }
    });
  } else {
    res.end();
  }
});

app.get("/user/me", function (request, response) {
  let email = request.session.email;

  if (email) {
    dbConnection.query(
      "SELECT email FROM admins WHERE Email = ? ",
      [email],
      function (error, results, fields) {
        if (error) throw error;

        if (results.length > 0) {
          response.status(200).json(results);
          response.end();
          return;
        }

        dbConnection.query(
          "SELECT name,email FROM students WHERE email = ?",
          [email],
          function (error, results, fields) {
            if (error) throw error;

            if (results.length > 0) {
              response.status(200).json(results);
            }
            response.end();
          }
        );
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});

const crypt = (salt, text) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};
