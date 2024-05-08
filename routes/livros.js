import express from 'express';

import { getLivros, postLivros, getLivro, patchLivro } from '../controllers/livros.js'

const router = express.Router();

router.get('/', getLivros);

router.post('/', postLivros)

router.get('/:id', getLivro)

router.patch('/:id', patchLivro)

export default router;