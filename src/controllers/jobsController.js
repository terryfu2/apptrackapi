import dbConnection from '../database/dbConnection';

export const getJobs = (req, res) => {

    let sqlQuery = 'SELECT * FROM descriptions';

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

export const getJobsById = (req, res) => {

    const jobid = parseInt(req.params.id);
    let sqlQuery = `SELECT * FROM descriptions WHERE jobid = ${jobid}`;

    if (isNaN(jobid)) {
        return res.json('You must enter a valid id as a parameter');
    }

    dbConnection.query(sqlQuery, (error, result) => {
        if (error) throw error;
        res.status(200).json(result);
    });
};

export const getJobsByLocation = (req, res) => {

    const location = req.params.location;
    let sqlQuery = `SELECT * FROM descriptions WHERE locationName = '${location}'`;

  

    dbConnection.query(sqlQuery, (error, result) => {
        if (error) throw error;
        res.status(200).json(result);
    });
};

export const getJobsByCategory = (req, res) => {

    const categoryName = req.params.categoryName;
    let sqlQuery = `SELECT * FROM descriptions WHERE categoryName = '${categoryName}'`;

  

    dbConnection.query(sqlQuery, (error, result) => {
        if (error) throw error;
        res.status(200).json(result);
    });
};

export const getJobsByCompany = (req, res) => {

    const companyName = req.params.companyName;
    let sqlQuery = `SELECT * FROM descriptions WHERE companyName = '${companyName}'`;

  

    dbConnection.query(sqlQuery, (error, result) => {
        if (error) throw error;
        res.status(200).json(result);
    });
};

export const createNewJob = (req, res) => {
    //TODO: ADMIN

    const job = req.body;
    const jobObj = [
        job.companyName,
        job.categoryName,
        job.description,
        job.locationName,
        job.deadline,
        job.link
    ];

    let sqlQuery = 'INSERT INTO descriptions (companyName,categoryName,description,locationName,deadline,link) VALUES ( ? , ? , ? , ? , ? ,? )';

    dbConnection.query(sqlQuery,jobObj, (err, result) => {
        if (err) throw err;
        res.status(201).json('Job created with id: '+ result.insertId);
    });
};

