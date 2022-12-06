import dbConnection from '../database/dbConnection';


export const getCompanies = (req, res) => {
    //TODO: ADMIN
    if(!req.session.admin) {
        res.status(401).send("Unauthorized: You must be an admin to get all companies");
        return;
    }
    let sqlQuery = `SELECT * FROM companies`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};



export const createCompany = (req, res) => {
    //TODO: ADMIN

    if(!req.session.admin) {
        res.status(401).send("Unauthorized: You must be an admin to create companies");
        return;
    }

    const company = req.body;
    const cObj = [
        company.companyName
        
    ];

    let sqlQuery = 'INSERT INTO companies (companyName) VALUES ( ? )';
    dbConnection.query(sqlQuery,cObj, (err, result) => {
        
        if (err) throw err;
        
        res.status(201).json();
    });
    
};
