import dbConnection from "../database/dbConnection";

export const getApplications = (req, res) => {
  if (!req.session.admin) {
    res
      .status(401)
      .send("Unauthorized: You must be an admin to get all applications");
    return;
  }

  let sqlQuery = "SELECT * FROM applications";
  console.log(req.session.loggedin);
  dbConnection.query(sqlQuery, (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

export const getApplicationByStudent = (req, res) => {
  if (!req.session.email) {
    res
      .status(401)
      .send("Unauthorized: You must be logged in to see your applications");
    return;
  }

  const find = req.session.email;
  let sqlQuery = `SELECT * FROM applications WHERE sEmail = '${find}'`;

  dbConnection.query(sqlQuery, (error, result) => {
    if (error) throw error;
    res.status(200).json(result);
  });
};

export const createApplications = (req, res) => {
  const application = req.body;
  const applicationtObj = [
    application.currentstatus,
    application.dateapplied,
    application.notes,
    req.session.email,
    application.deadline,
    application.company,
    application.role,
    application.link,
  ];

  let sqlQuery =
    "INSERT INTO applications (currentstatus,dateapplied,notes,sEmail,deadline,company,role,link) VALUES ( ? , ? , ? , ? ,? , ? , ? ,? )";
  dbConnection.query(sqlQuery, applicationtObj, (err, result) => {
    if (err) throw err;

    res.status(201).json("Application created with id: " + result.insertId);
  });
};

export const updateApplication = (req, res) => {
  const applicationid = parseInt(req.params.applicationid);
  const application = req.body;
  const applicationtObj = [
    application.currentstatus,
    application.dateapplied,
    application.notes,
    req.session.email,
    application.deadline,
    application.company,
    application.role,
    application.link,
  ];

  let sqlQuery = `UPDATE applications SET currentstatus = ?, dateapplied = ? ,notes = ?,sEmail = ?,deadline = ? ,company = ? ,role = ?,link = ? WHERE applicationid = ${applicationid}`;

  dbConnection.query(sqlQuery, applicationtObj, (error, result) => {
    if (error) throw error;

    res.json();
  });
};

export const deleteApplication = (req, res) => {
  if (!req.session.email) {
    res
      .status(401)
      .send("Unauthorized: You must be logged in to delete your applications");
    return;
  }

  const applicationid = parseInt(req.params.applicationid);
  const applicationtObj = [req.session.email, applicationid];

  let sqlQuery = `DELETE FROM applications WHERE sEmail = ? AND applicationid = ?`;

  dbConnection.query(sqlQuery, applicationtObj, (error, result) => {
    if (error) throw error;
    res.status(200).json(result);
  });
};
