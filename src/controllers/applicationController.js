import dbConnection from '../database/dbConnection';

export const getApplications = (req, res) => {

    let sqlQuery = 'SELECT * FROM applications';
    console.log(req.session);
    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

export const getApplicationByStudent = (req, res) => {

    const find = req.params.sEmail;
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
        application.sEmail,
        application.deadline,
        application.company,
        application.role,
        application.link
    ];

    let sqlQuery = 'INSERT INTO applications (currentstatus,dateapplied,notes,sEmail,deadline,company,role,link) VALUES ( ? , ? , ? , ? ,? , ? , ? ,? )';
    dbConnection.query(sqlQuery,applicationtObj, (err, result) => {
        
        if (err) throw err;
        
        res.status(201).json('Application created with id: '+ result.insertId);
    });
    
};

export const updateApplication = (req, res) => {
    
    const applicationid = parseInt(req.params.applicationid);
    const application = req.body;
    const applicationtObj = [
        application.currentstatus,
        application.dateapplied,
        application.notes,
        application.sEmail,
        application.deadline,
        application.company,
        application.role,
        application.link
    ];


    let sqlQuery = `UPDATE applications SET currentstatus = ?, dateapplied = ? ,notes = ?,sEmail = ?,deadline = ? ,company = ? ,role = ?,link = ? WHERE applicationid = ${applicationid}`

    dbConnection.query(sqlQuery, applicationtObj,  (error, result) => {
        if (error) throw error;
        
        res.json();
    });
};
