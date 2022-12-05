import dbConnection from '../database/dbConnection';


export const getAdminByEmails = (req, res) => {

    const find = req.params.email;
    let sqlQuery = `SELECT * FROM admins WHERE email = '${find}'`;    

    dbConnection.query(sqlQuery, (error, result) => {
        if (error) throw error;
        res.status(200).json(result[0]);
    });
};

//todo just finishing
export const updateAdminEmail = (req, res) => {
    const email = req;

    const aemailobj = [
        email.new,
        email.old
    ];

    let sqlQuery = 'UPDATE admins '


}



// export const updateApplications = (req, res) => {
//     //todo need to add the where section in that applicationobj
//         const application = req.body;
//         const applicationtObj = [
//             application.currentstatus,
//             application.dateapplied,
//             application.notes,
//             application.sEmail
//         ];
    
//         let sqlQuery = 
//             'UPDATE applications (currentstatus,dateapplied,notes,sEmail) WHERE ';//todo need to add the where section in that applicationobj and this part
//         dbConnection.query(sqlQuery,applicationtObj, (err, result) => {
            
//             if (err) throw err;
            
//             res.status(201).json('Application updated with id: '+ result.insertId);
//         });
        
//     };