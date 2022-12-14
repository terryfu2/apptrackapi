import dbConnection from "../database/dbConnection";

export const getStudents = (req, res) => {
  //TODO: ADMIN
  if (!req.session.admin) {
    res
      .status(401)
      .send("Unauthorized: You must be an admin to get all students");
    return;
  }

  let sqlQuery = "SELECT * FROM students";

  dbConnection.query(sqlQuery, (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

export const getMe = (req, res) => {
  //TODO: AUTH
  console.log(req.session);

  if (!req.session.email) {
    res.status(401);
    res
      .status(401)
      .send("Unauthorized: You must be logged in to get your profile");
    return;
  }

  //const pass = (req.params.password).hashCode();
  let sqlQuery = `SELECT name,email FROM students WHERE email = ?`;

  dbConnection.query(sqlQuery, [req.session.email], (error, result) => {
    if (error) throw error;
    res.status(200).json(result);
  });
};

export const updateStudent = (req, res) => {
  //TODO: AUTH

  const student = req.body;
  const studentObj = [student.name];

  let sqlQuery = `UPDATE students SET name = ? WHERE email = '${req.session.email}'`;

  dbConnection.query(sqlQuery, studentObj, (error, result) => {
    if (error) throw error;

    res.json();
  });
};

export const createNewStudent = (req, res) => {
  //TODO: SIGNUP

  const student = req.body;
  const studentObj = [
    student.email,
    crypt("salt", student.password),
    student.name,
  ];

  if (!student.email || !student.password) {
    return res.json({
      ErrorCode: 204,
      Message: "Fields cannot be empty",
    });
  }

  let sqlQuery =
    "INSERT INTO students (email,password,name) VALUES ( ? , ? , ? )";

  dbConnection.query(sqlQuery, studentObj, (err, result) => {
    if (err) throw err;
    res.status(201).json();
  });
};

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

const decrypt = (salt, encoded) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};
