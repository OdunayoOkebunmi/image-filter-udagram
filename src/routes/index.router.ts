import { Router, Request, Response } from 'express';
import { ImageFilterRouter } from './image-filter.router';

const router: Router = Router();

router.use('/image', ImageFilterRouter);


export const IndexRouter: Router = router;