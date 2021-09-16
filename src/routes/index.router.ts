import { Router, Request, Response } from 'express';
import { ImageFilterRouter } from './image-filter.router';
import { UserRouter } from './auth.router';

const router: Router = Router();

router.use('/image', ImageFilterRouter);
router.use('/auth', UserRouter);


export const IndexRouter: Router = router;