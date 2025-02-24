import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { createSubscription, getUserSubscriptions } from '../contollers/subscription.controller.js';


const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => { res.json( { title: 'GET all subscriptions' })})

subscriptionRouter.get('/:id', (req, res) => { res.json( { title: 'GET subscription details' })})

subscriptionRouter.post('/', authorize, createSubscription)

subscriptionRouter.put('/', (req, res) => { res.json( { title: 'UPDATE subscription' })})

subscriptionRouter.delete('/', (req, res) => { res.json( { title: 'DELETE subscription' })})

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => { res.json( { title: 'CANCEL subscription' })})

subscriptionRouter.get('/upcoming-renewals', (req, res) => { res.json( { title: 'GET upcoming renewals' })})

export default subscriptionRouter;