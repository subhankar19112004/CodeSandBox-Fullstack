import express from 'express';
import { pingCheck } from '../../controllers/pingController.js';
import projectsRouter from './projects.js';

const router = express.Router();

router.use('/ping', pingCheck);
router.use('/projects',projectsRouter )


export default router;  