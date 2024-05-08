import express from 'express';

import { getReservas, postReserva, getReserva, patchReserva } from '../controllers/reservas.js'

const router = express.Router();

router.get('/', getReservas);

router.post('/', postReserva);

router.get('/:id', getReserva);

router.patch('/:id', patchReserva);


export default router;