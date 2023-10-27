import { getUserFromToken } from '../Middleware/auth.js'
import { QueryParamsHandle } from '../Middleware/helpers.js'
import User from '../Models/System/user.model.js'
import Order from '../Models/order.model.js'
import OrderLine from '../Models/orderline.model.js'

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderLine)
OrderLine.belongsTo(Order)

export default class OrderController {

	/**
	 * List Metode - henter alle records
	 * @param {object} req 
	 * @param {object} res 
	 * @return {array} Returnerer JSON array
	 */
	list = async (req, res) => {
		// List Display Mode (All/By user)
		const { listmode } = req.query
		// Sortering & constraints
		const qp = QueryParamsHandle(req)
		// Get user id
		const user_id = await getUserFromToken(req,res)
		
		const query = {
			order: [qp.sort_key],
			limit: qp.limit,
			attributes: qp.attributes,
			include: [{
				model: OrderLine
			}, {
				model: User,
				attributes: ['firstname','lastname','email']
			}]
		}

		if(listmode) {
			query.where = {
				user_id: user_id
			}
		}

		try {
			const result = await Order.findAll(query)
			// Parser resultat som json
			res.json(result)			
		} catch (error) {
			res.status(418).send({
				message: `Something went wrong: ${error}`
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
				const result = await Order.findOne({
					include: [{
						model: OrderLine,
					},{
						model: User,
						attributes: ['firstname','lastname','email']
					}],		
					where: { id: id}
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
		const { delivery_address, delivery_zipcode, delivery_city, delivery_country_id,  } = req.body

		if(delivery_address && delivery_zipcode && delivery_city && delivery_country_id) {
			try {
				req.body.user_id = user_id
				const model = await Order.create(req.body)
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
	 * Delete Metode - sletter record
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 * @return {boolean} Returnerer true/false
	 */	
	remove = async (req, res) => {
		const { id } = req.params

		if(id) {
			try {
				await OrderLine.destroy({ 
					where: { order_id: id }
				})
				await Order.destroy({ 
					where: { id: id }
				})
				res.status(200).send({
					message: `Record deleted`
				})
			}
			catch(error) {
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