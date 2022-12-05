import dbConnection from '../database/dbConnection';

export const getStudents = (req, res) => {

    let sqlQuery = 'SELECT * FROM students';

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

export const getStudentByEmails = (req, res) => {

    const find = req.params.email;
    let sqlQuery = `SELECT * FROM students WHERE email = '${find}'`;
    

    dbConnection.query(sqlQuery, (error, result) => {
        if (error) throw error;
        res.status(200).json(result[0]);
    });
};



export const createNewStudent = (req, res) => {

    const student = req.body;
    const studentObj = [
        student.email,
        student.password
    ];

    if (!student.email || !student.password ) {
        return res.json({
            ErrorCode: 204,
            Message: 'Fields cannot be empty'
        });
    }

    let sqlQuery = 'INSERT INTO students (email,password) VALUES ( ? , ? )';

    dbConnection.query(sqlQuery,studentObj, (err, result) => {
        if (err) throw err;
        res.status(201).json('Student created with id: '+ result.affectedRows);
    });
};


//need a third question mark is there a way to explictly bind in the java script?

export const updateCurrentStudent = (req, res) => {

    const studentid = req;
    const studentObj = [
        student.email,
        student.password
    ];

    let sqlQuery = 'UPDATE sutdents SET (email = ?, password = ?) where email = ?'

}

