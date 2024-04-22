/**
 * Author Template
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { createAuthor, getAuthors, getAuthor } from '../services/author_service'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('prisma-books:author_controller')

/**
 * Get all authors
 */
export const index = async (req: Request, res: Response) => {
	try {
		const authors = await getAuthors()
		res.send({
			status: "success",
			data: authors,
		})
	} catch (err) {
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

/**
 * Get a single author
 */
export const show = async (req: Request, res: Response) => {
	const authorId = Number(req.params.authorId)

	try {
		const author = await getAuthor(authorId)

		res.send({
			status: "success",
			data: author,
		})

	} catch (err) {
		debug("Error thrown when finding author with id %o: %o", req.params.authorId, err)
		return res.status(404).send({ status: "error", message: "Not found" })
	}
}

/**
 * Create a author
 */
export const store = async (req: Request, res: Response) => {
	// Check for any validation errors
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}

	try {
		const author = await createAuthor({
			name: req.body.name,
		})
		res.send({
			status: "success",
			data: author,
		})
	} catch (err) {
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

/**
 * Bulk create authors
 */
export const storeBulkAuthors = async (req: Request, res: Response) => {
  const authors = req.body.authors;

  // Validate the input
  if (!Array.isArray(authors) || authors.length === 0) {
      return res.status(400).send({
          status: "fail",
          message: "Invalid input: please provide an array of author data."
      });
  }

  try {
      const createdAuthors = await prisma.author.createMany({
          data: authors,
          skipDuplicates: true, // Optionally skip duplicates based on unique constraints
      });

      res.status(201).send({
          status: "success",
          data: createdAuthors,
          message: `${createdAuthors.count} authors have been created successfully.`
      });
  } catch (err) {
      res.status(500).send({
          status: "error",
          message: "Something went wrong while creating authors."
      });
  }
};


/**
 * Update a author
 */
export const update = async (req: Request, res: Response) => {
  const authorId = Number(req.params.authorId);
  const updateData = req.body;

  try {
      const updatedAuthor = await prisma.author.update({
          where: {
              id: authorId
          },
          data: updateData,
      });

      res.send({
          status: "success",
          data: updatedAuthor,
          message: "Author updated successfully."
      });
  } catch (error : any) {
      if (error.code === "P2025") {
          res.status(404).send({ status: "error", message: "Author not found." });
      } else {
          res.status(500).send({ status: "error", message: "Something went wrong." });
      }
  }
};

/**
 * Delete a author
 */
export const destroy = async (req: Request, res: Response) => {
  const authorId = Number(req.params.authorId);

  try {
      await prisma.author.delete({
          where: {
              id: authorId
          }
      });

      res.send({
          status: "success",
          message: "Author deleted successfully."
      });
  } catch (error : any) {
      if (error.code === "P2025") {
          res.status(404).send({ status: "error", message: "Author not found." });
      } else {
          res.status(500).send({ status: "error", message: "Something went wrong." });
      }
  }
};
/**
 * Link books to a author
 */
export const addBook = async (req: Request, res: Response) => {
	console.log("Books to connect: ", req.body.bookIds)
	const bookIds = req.body.bookIds.map( (bookId: Number) => {
		return {
			id: bookId,
		}
	})  // [ { id: 3 }, { id: 4 } ]
	console.log("Books after map: ", bookIds)

	try {
		const result = await prisma.author.update({
			where: {
				id: Number(req.params.authorId),
			},
			data: {
				books: {
					connect: bookIds,
				}
			},
			include: {
				books: true,
			}
		})
		res.status(201).send(result)
	} catch (err) {
		debug("Error thrown when adding book %o to a author %o: %o", bookIds, req.params.authorId, err)
		res.status(500).send({ message: "Something went wrong" })
	}
}

/**
 * Link multiple books to an author
 */
export const addBooks = async (req: Request, res: Response) => {
  // Assuming bookIds are passed as an array of numbers in the body
  const { bookIds } = req.body;

  // Validate input
  if (!bookIds || !Array.isArray(bookIds) || !bookIds.length) {
      return res.status(400).send({
          status: "fail",
          message: "Invalid book IDs. Please provide an array of book IDs."
      });
  }

  // Mapping IDs to the format required by Prisma
  const connectionArray = bookIds.map(id => ({ id }));

  try {
      const result = await prisma.author.update({
          where: { id: Number(req.params.authorId) },
          data: {
              books: {
                  connect: connectionArray,
              }
          },
          include: {
              books: true, // Include updated list of books in the response
          }
      });

      return res.status(201).send({
          status: "success",
          data: result,
          message: "Books successfully linked to author."
      });

  } catch (err) {
      debug("Error linking books to author: %o", err);
      res.status(500).send({
          status: "error",
          message: "Failed to link books to author."
      });
  }
}

/**
 * Unlink book from author
 */
export const removeBook = async (req: Request, res: Response) => {
	try {
		await prisma.author.update({
			where: {
				id: Number(req.params.authorId),
			},
			data: {
				books: {
					disconnect: {
						id: Number(req.params.bookId),
					}
				}
			}
		})

	} catch (err) {
		debug("Error thrown when removing book %o from author %o: %o", req.body.bookId, req.params.authorId, err)
		res.status(500).send({ message: "Something went wrong" })
	}
}
