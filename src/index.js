import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './router';
import cors from 'cors';

const app = express();
dotenv.config();

const port = process.env.NODE_PORT;

app.use(morgan('dev'));

app.use(cors());

app.use( express.json());
app.use( express.urlencoded( { extended:true } ) );


router(app);


app.listen( port, () => {
    console.log(`Server running in port ${port}`);
});