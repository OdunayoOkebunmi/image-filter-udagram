import { Router } from 'express';
import { filterImage } from '../controllers/v0/filtered-image/filtered-image'
const router: Router = Router();

router.get('/filteredimage', filterImage);

export const ImageFilterRouter: Router = router;
