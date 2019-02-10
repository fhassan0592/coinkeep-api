import express from 'express';

import authRoutes from './authentication/auth.routes.js';
import budgetRoutes from './budgets/budgets.routes.js';


const router = express.Router();


router.use('/authentication', authRoutes);

router.use('/budgets', budgetRoutes);





export default router;