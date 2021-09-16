import { Router } from 'express';
import { filterImage } from '../controllers/v0/filtered-image/filtered-image'
import { requireAuth } from '../util/auth-middleware';

const router: Router = Router();

router.get('/filteredimage', requireAuth, filterImage);

export const ImageFilterRouter: Router = router;
