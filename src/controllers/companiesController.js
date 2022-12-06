import dbConnection from '../database/dbConnection';


export const getCompanies = (req, res) => {
    //TODO: ADMIN

    let sqlQuery = `SELECT * FROM companies`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};



export const createCompany = (req, res) => {
    //TODO: ADMIN

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
