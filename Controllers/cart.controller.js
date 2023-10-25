import User from '../Models/System/user.model.js'
import CartLine from '../Models/cart.model.js'
import { getUserFromToken } from '../Middleware/auth.js'
import Product from '../Models/product.model.js'
import { QueryParamsHandle } from '../Middleware/helpers.js'

// Sætter modellers relationelle forhold - een til mange
User.hasMany(CartLine)
CartLine.belongsTo(User)

Cart.hasMany(Product)
Product.belongsTo(Cart)

export default class CartController {

	/**
	 * List Metode - henter alle records
	 * @param {object} req 
	 * @param {object} res 
	 * @return {array} Returnerer JSON array
	 */
	list = async (req, res) => {
		const user_id = await getUserFromToken(req, res)

		if(user_id) {
			try {
				const result = await CartLine.findAll({
					include: [{
						model: Product,
						attributes: ['id','title']
					}],
					where: { user_id: user_id }
		
				})
				// Parser resultat som json
				res.json(result)			
			} catch (error) {
				res.status(418).send({
					message: `Something went wrong: ${error}`
				})						
			}	
		} else {
			res.status(403).send({
				message: `Wrong parameter values`
			})					
		}

	}

	/**
	 * GET Metode henter record ud fra id
	 * @param {object} req 
	 * @param {object} res 
	 * @return {object} Returnerer JSON object med detaljer
	 */
	details = async (req, res) => {
		const { id } = req.params

		if(id) {
			try {
				const result = await Cart.findOne({
					attributes: ['id', 'subject', 'comment', 'num_stars', 'created_at'],
					include: [{
						model: User,
						attributes: ['firstname', 'lastname', 'email']
					}, {
						model: Product,
						attributes: ['title']
					}],
		
					where: { id: req.params.id}
				});
				res.json(result)						
			} catch (error) {
				res.status(418).send({
					message: `Something went wrong: ${error}`
				})						
			}
		} else {
			res.status(403).send({
				message: `Wrong parameter values`
			})					
		}
	}

	/**
	 * Create Metode - opretter ny record
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 * @return {number} Returnerer nyt id
	 */
	 create = async (req, res) => {
		const user_id = await getUserFromToken(req, res)
		const { subject, comment, date, num_stars, product_id } = req.body

		if(subject && comment && num_stars && product_id) {
			try {
				req.body.user_id = user_id
				const model = await Cart.create(req.body)
				return res.json({
					message: `Record created`,
					newId: model.id
				})					
			} catch (error) {
				res.status(418).send({
					message: `Could not create record: ${error}`
				})									
			}
		} else {
			res.status(403).send({
				message: `Wrong parameter values`
			})					
		}
	}	

	/**
	 * Update Metode - opdaterer record
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 * @return {boolean} Returnerer true/false
	 */	
	 update = async (req, res) => {
		const { id, subject, comment, num_stars, is_active } = req.body

		if(id, subject && comment && num_stars && is_active) {
			try {
				const model = await Cart.update(req.body, {
					where: { id: id }
				})
				return res.json({
					message: `Record updated`	
				})					
			} catch (error) {
				res.status(418).send({
					message: `Could not update record: ${error}`
				})				
			}
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}

	/**
	 * Delete Metode - sletter record
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 * @return {boolean} Returnerer true/false
	 */	
	remove = async (req, res) => {
		const { id } = req.params

		if(id) {
			try {
				await Cart.destroy({ 
					where: { id: req.params.id }
				})
				res.status(200).send({
					message: `Record deleted`
				})
			}
			catch(err) {
				res.status(418).send({
					message: `Could not delete record: ${error}`
				})									
			}	
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})			
		}
	}	
}