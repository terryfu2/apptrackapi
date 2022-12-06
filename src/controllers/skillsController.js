import dbConnection from '../database/dbConnection';


export const getSkillsAll = (req, res) => {
    //TODO: ADMIN

    let sqlQuery = `SELECT * FROM allskills`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

export const createAllSkill = (req, res) => {
    //TODO: ADMIN

    const skill = req.body;
    const skillObj = [
        skill.skillName
        
    ];

    let sqlQuery = 'INSERT INTO allskills (skillName) VALUES ( ? )';
    dbConnection.query(sqlQuery,skillObj, (err, result) => {
        
        if (err) throw err;
        
        res.status(201).json();
    });
    
};

export const getSkillsFromJob = (req, res) => {
    //TODO: ADMIN

    const find = parseInt(req.params.jobid);
    let sqlQuery = `SELECT * FROM skills WHERE jobid = ${find}`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};


export const createSkill = (req, res) => {
    //TODO: ADMIN

    const skill = req.body;
    const skillObj = [
        skill.jobid,
        skill.skillname
        
    ];

    let sqlQuery = 'INSERT INTO skills (jobid,skillname) VALUES ( ? , ? )';
    dbConnection.query(sqlQuery,skillObj, (err, result) => {
        
        if (err) throw err;
        
        res.status(201).json();
    });
    
};
