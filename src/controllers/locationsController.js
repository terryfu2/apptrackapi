import dbConnection from '../database/dbConnection';


export const getLocations = (req, res) => {

    let sqlQuery = `SELECT * FROM locations`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};



export const createLocation= (req, res) => {

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

//not sure what status(201 or 202 does)
export const updateLocation = (req, res) => {

    const location = req.body;
    const obj = [
        
        location.country,
        location.state,
        location.locationName
    ]

    let sqlQuery = 'UPDATE locations SETS country = ?, state = ? where locationName = ?';
    dbConnection.query(sqlQuery, obj, (err, result) => {
        if (err) throw err;

        res.status(202).json()});
    
}
