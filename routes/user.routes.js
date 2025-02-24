import { Router } from 'express'
import authorize from '../middlewares/auth.middleware.js'
import { getUsers, getUser } from '../contollers/user.controller.js'

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) => { res.json( { title: 'CREATE new user'} ) })

userRouter.put('/:id', (req, res) => { res.json( { title: 'UPDATE user'} ) })

userRouter.delete('/:id', (req, res) => { res.json( { title: 'DELETE user'} ) })

export default userRouter;