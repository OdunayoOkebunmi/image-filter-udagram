import { Router } from 'express';
import { createUser, signin } from '../controllers/v0/users/users'
const router: Router = Router();

router.post('/signup', createUser);
router.post('/signin', signin);

export const UserRouter: Router = router;
