/**
 * Validation Rules for User resource
 */
import { body } from 'express-validator'
import { getUserByEmail } from '../services/user_service'

export const createUserRules = [
	body('name').isString().bail().isLength({ min: 3 }),
	body('email').isEmail().custom(async (value: string) => {
		// check if a User with that email already exists
		const user = await getUserByEmail(value)

		if (user) {
			// user already exists, throw a hissy-fit
			return Promise.reject("Email already exists")
		}
	}),
	body('password').isString().bail().isLength({ min: 6 }),
]

export const updateUserRules = [
	body('name').optional().isString().bail().isLength({ min: 3 }),
	body('email').optional().isEmail().custom(async (value: string) => {
		// check if a User with that email already exists
		const user = await getUserByEmail(value)

		if (user) {
			// user already exists, throw a hissy-fit
			return Promise.reject("Email already exists")
		}
	}),
	body('password').optional().isString().bail().isLength({ min: 6 }),
]
