import express from 'express'
import { index, show, store, storeBulkBooks, update, destroy } from '../controllers/book_controller'
const router = express.Router()

/**
 * GET /books
 */
router.get('/', index)

/**
 * GET /books/:bookId
 */
router.get('/:bookId', show)

/**
 * POST /books
 */
router.post('/', store)

/**
 * POST /books/bulk
 */
// Route for bulk creating books
router.post('/bulk', storeBulkBooks);

/**
 * PUT /books/:bookId
 */
router.put('/books/:bookId', update);

/**
 * DELETE /books/:bookId
 */
router.delete('/books/:bookId', destroy)

export default router
