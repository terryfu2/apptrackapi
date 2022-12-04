import dbConnection from '../database/dbConnection';


export const getAdminByEmails = (req, res) => {

    const find = req.params.email;
    let sqlQuery = `SELECT * FROM admins WHERE email = '${find}'`;    

    dbConnection.query(sqlQuery, (error, result) => {
        if (error) throw error;
        res.status(200).json(result[0]);
    });
};

