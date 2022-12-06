import dbConnection from "../database/dbConnection";

export const isAdmin = (req, res) => {
  if (!req.session.admin) {
    res.status(200).json({ admin: false });
    return;
  }

  const find = req.params.email;
  let sqlQuery = `SELECT * FROM admins WHERE email = '${find}'`;

  dbConnection.query(sqlQuery, (error) => {
    if (error) throw error;
    res.status(200).json({ admin: true });
  });
};
