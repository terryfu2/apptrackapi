import dbConnection from '../database/dbConnection';


export const getCompanies = (req, res) => {

    let sqlQuery = `SELECT * FROM companies`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};



export const createCompany = (req, res) => {

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

export const updateCompanyName = (req, res) => {
    const oldCompanyNaem = req.body
    const obj = [
        company.companyName,
        company.oldName
    ];

    let sqlQuery = 'UPDATE companies SET companyName = ? where companyName = ?';
    dbConnection.query(sqlQuery, obj, (err, result) => {
        if(err) throw err;
        
        res.status(201).json();
    });
}
