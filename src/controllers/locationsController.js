import dbConnection from '../database/dbConnection';


export const getLocations = (req, res) => {
    //TODO: ADMIN

    let sqlQuery = `SELECT * FROM locations`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};



export const createLocation= (req, res) => {
    //TODO: ADMIN

    const location = req.body;
    const cObj = [
        location.locationName,
        location.country,
        location.state
        
    ];

    let sqlQuery = 'INSERT INTO locations (locationName,country,state) VALUES ( ? , ? , ?)';
    dbConnection.query(sqlQuery,cObj, (err, result) => {
        
        if (err) throw err;
        
        res.status(201).json();
    });
    
};
