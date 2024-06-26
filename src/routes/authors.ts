/**
 * Handles all `/authors` routes
 */
import express from 'express'
import { body } from 'express-validator'
import { index, show, store, addBook, removeBook, addBooks, storeBulkAuthors } from '../controllers/author_controller'
const router = express.Router()

/**
 * GET /authors
 */
router.get('/', index)

/**
 * GET /authors/:authorId
 */
router.get('/:authorId', show)

/**
 * POST /authors
 */
router.post('/', [
	body('name').optional().isString().withMessage('has to be a string').bail().isLength({ min: 3, max: 191 }).withMessage('has to be 3-191 chars long'),
], store)

/**
 * POST /many-authors
 */
router.post('/bulk', [
	body('name').optional().isString().withMessage('has to be a string').bail().isLength({ min: 3, max: 191 }).withMessage('has to be 3-191 chars long'),
], storeBulkAuthors)

/**
 * POST /authors/:authorId/books
 */
router.post('/:authorId/books', addBook)

/**
 * POST /authors/:authorId/books
 */
router.post('/:authorId/many/books', addBooks)

/**
 * DELETE /authors/:authorId/books/:bookId
 */
router.delete('/:authorId/books/:bookId', removeBook)

export default router
