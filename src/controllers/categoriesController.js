import dbConnection from '../database/dbConnection';


export const getCategories = (req, res) => {
    //TODO: ADMIN
    if(!req.session.admin) {
        res.status(401).send("Unauthorized: You must be an admin to get all categories");
        return;
    }
    let sqlQuery = `SELECT * FROM categories`;

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};



export const createCategory= (req, res) => {
    //TODO: ADMIN
    if(!req.session.admin) {
        res.status(401).send("Unauthorized: You must be an admin to create categories");
        return;
    }
    const category = req.body;
    const cObj = [
        category.categoryName
        
    ];

    let sqlQuery = 'INSERT INTO categories (categoryName) VALUES ( ? )';
    dbConnection.query(sqlQuery,cObj, (err, result) => {
        
        if (err) throw err;
        
        res.status(201).json();
    });
    
};
