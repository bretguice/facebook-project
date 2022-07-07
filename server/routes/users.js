import express from 'express';
import { getUsers, getUser, updateUser, friendRequest, acceptFriend, declineFriend } from '../controllers/users.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getUsers)
router.get('/:id', getUser);
router.patch('/:id', auth, updateUser);
router.patch('/friendRequest/:id', auth, friendRequest);
router.put('/friend/:id', auth, acceptFriend);
router.put('/friend/:id', auth, declineFriend)

export default router;