/**
 * Book Controller
 */
import { Request, Response } from 'express'
import Debug from 'debug'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('prisma-books:book_controller')

/**
 * Get all books
 */
export const index = async (req: Request, res: Response) => {
	try {
		const books = await prisma.book.findMany()

		res.send({
			status: "success",
			data: books,
		})

	} catch (err) {
		debug("Error thrown when finding books", err)
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

/**
 * Get a single book
 */
export const show = async (req: Request, res: Response) => {
	const bookId = Number(req.params.bookId)

	try {
		const book = await prisma.book.findUniqueOrThrow({
			where: {
				id: bookId,
			},
			include: {
				authors: true,
				publisher: true,
			}
		})

		res.send({
			status: "success",
			data: book,
		})

	} catch (err) {
		debug("Error thrown when finding book with id %o: %o", req.params.bookId, err)
		return res.status(404).send({ status: "error", message: "Not found" })
	}
}

/**
 * Create a book
 */
export const store = async (req: Request, res: Response) => {
	try {
		const book = await prisma.book.create({
			data: {
				title: req.body.title,
				pages: req.body.pages,
				isbn: req.body.isbn,
				publisherId: req.body.publisherId,
				cover: req.body.cover,
			}
		})

		res.send({
			status: "success",
			data: book,
		})

	} catch (err) {
		debug("Error thrown when creating a book %o: %o", req.body, err)
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

/**
 * Bulk create books
 */
export const storeBulkBooks = async (req: Request, res: Response) => {
  const books = req.body.books;

  // Validate the input
  if (!Array.isArray(books) || books.length === 0) {
      return res.status(400).send({
          status: "fail",
          message: "Invalid input: please provide an array of book data."
      });
  }

  try {
      const createdBooks = await prisma.book.createMany({
          data: books,
          skipDuplicates: true, // Optionally skip duplicates based on unique constraints
      });

      res.status(201).send({
          status: "success",
          data: createdBooks,
          message: `${createdBooks.count} books have been created successfully.`
      });
  } catch (err) {
      debug("Error thrown when bulk creating books: %o", err);
      res.status(500).send({
          status: "error",
          message: "Something went wrong while creating books."
      });
  }
};

/**
 * Update a book
 */
/**
 * Update a book
 */
export const update = async (req: Request, res: Response) => {
  const bookId = Number(req.params.bookId);
  const updateData = req.body;

  try {
      const updatedBook = await prisma.book.update({
          where: {
              id: bookId
          },
          data: updateData,
      });

      res.send({
          status: "success",
          data: updatedBook,
          message: "Book updated successfully."
      });
  } catch (error : any) {
      debug("Error thrown when updating book with id %o: %o", bookId, error);
      if (error.code === "P2025") {
          res.status(404).send({ status: "error", message: "Book not found." });
      } else {
          res.status(500).send({ status: "error", message: "Something went wrong." });
      }
  }
};
/**
 * Delete a book
 */
export const destroy = async (req: Request, res: Response) => {
  const bookId = Number(req.params.bookId);

  try {
      await prisma.book.delete({
          where: {
              id: bookId
          }
      });

      res.send({
          status: "success",
          message: "Book deleted successfully."
      });
  } catch (error : any) {
      debug("Error thrown when deleting book with id %o: %o", bookId, error);
      if (error.code === "P2025") {
          res.status(404).send({ status: "error", message: "Book not found." });
      } else {
          res.status(500).send({ status: "error", message: "Something went wrong." });
      }
  }
};
