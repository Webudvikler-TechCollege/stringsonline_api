import { Op, Sequelize } from 'sequelize'
import { QueryParamsHandle } from '../Middleware/helpers.js'
import Brand from '../Models/brand.model.js'
import Product from '../Models/product.model.js'
import ProductGroup from '../Models/productgroup.model.js'
import ProductGroupRel from '../Models/productgroup_rel.model.js'

// Sætter modellers relationelle forhold - een til mange
Brand.hasMany(Product)
Product.belongsTo(Brand)

Product.belongsToMany(ProductGroup, { through: ProductGroupRel })
ProductGroup.belongsToMany(Product, { through: ProductGroupRel })

export default class ProductController {

	/**
	 * List Metode - henter alle records
	 * @param {object} req 
	 * @param {object} res 
	 * @return {array} Returnerer JSON array
	 */
	list = async (req, res) => {
		// Sortering & constaints
		const qp = QueryParamsHandle(req, 'id, title')

		const { productgroup_slug } = req.params || 0
		const { keyword } = req.params || 0

		try {
			const query = {
				order: [qp.sort_key],
				limit: qp.limit,
				attributes: [
					...qp.attributes,
					[Sequelize.fn(	
						'CONCAT', 
						'http://localhost:4000/Assets/Images/products/', 
						Sequelize.col('image')
					), 'image_filepath'],
					
				
				]
			}


			if(productgroup_slug) {
				query.include = {
					model: ProductGroup,
					attributes: [],
					where: { slug: productgroup_slug }
				}
			}

			if(keyword) {
				query.where = {
					[Op.or]: [
						{
						  title: {
							[Op.like]: `%${keyword}%`,
						  }
						},
						{
							description_long: {
							  [Op.like]: `%${keyword}%`,
							}
						}  
					]
				}
			}

			const result = await Product.findAll(query)
			console.log({result});
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
		const { product_slug } = req.params

		if(product_slug) {
			try {
				const result = await Product.findOne({	
					attributes: [
						'id',
						'title',
						'description_long',
						'price',
						'offerprice',
						'stock',
						'slug',
						[Sequelize.fn(	
							'CONCAT', 
							'http://localhost:4000/Assets/Images/products/', 
							Sequelize.col('image')
						), 'image_filepath']
					],
					/*
					include: [
						{
							model: Brand,
							attributes: [
								'id', 
								'title'
							]
						}
					], */
					where: { slug: product_slug, is_active: 1 }
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