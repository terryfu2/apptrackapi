import studentRoutes from './routes/students.routes';
import adminRoutes from './routes/admins.routes';
import jobRoutes from './routes/jobs.routes';
import applicationRoutes from './routes/application.routes'
import skillRoutes from "./routes/skills.routes";
import companiesRoutes from "./routes/companies.routes";
import categoryRoutes from "./routes/category.routes";
import locationRoutes from "./routes/location.routes";


const router = (app) => {
    app.use('/students',studentRoutes);
    app.use('/admins',adminRoutes);
    app.use('/jobs',jobRoutes);
    app.use('/applications',applicationRoutes);
    app.use('/skills',skillRoutes);
    app.use('/companies',companiesRoutes);
    app.use('/categories',categoryRoutes);
    app.use("/locations",locationRoutes);
};

export default router; 