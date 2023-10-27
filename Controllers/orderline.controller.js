import { getUserFromToken } from '../Middleware/auth.js'
import { QueryParamsHandle } from '../Middleware/helpers.js'
import Order from '../Models/order.model.js'
import OrderLine from '../Models/orderline.model.js'

export default class OrderLineController {

	/**
	 * Create Metode - opretter ny record
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 * @return {number} Returnerer nyt id
	 */
	create = async (req, res) => {
		const { order_id, product_id, name, quantity, price } = req.body

		if(order_id && product_id && name && quantity && price) {
			try {
				const model = await OrderLine.create(req.body)
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