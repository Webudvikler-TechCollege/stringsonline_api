import { QueryParamsHandle } from '../Middleware/helpers.js'
import ProductGroup from '../Models/productgroup.model.js'

export default class ProductGroupController {

	/**
	 * List Metode - henter alle records
	 * @param {object} req 
	 * @param {object} res 
	 * @return {array} Returnerer JSON array
	 */
	list = async (req, res) => {
		// Sortering & constaints
		const qp = QueryParamsHandle(req, 'id, title')

		try {
			const result = await ProductGroup.findAll({
				order: [qp.sort_key],
				limit: qp.limit,
				attributes: qp.attributes
			})
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
				const result = await ProductGroup.findOne({		
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
}