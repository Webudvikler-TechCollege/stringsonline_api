import fs from 'fs'
import csv from 'csv-parser'
import path from 'path';
import sequelize from '../../Config/sequelize.config.js';

import Orgs from '../../Models/System/org.model.js';
import Groups from '../../Models/System/group.model.js';
import Users from '../../Models/System/user.model.js';
import UserGroupRel from '../../Models/System/user-group-rel.model.js';

import Brand from '../../Models/brand.model.js';
import Product from '../../Models/product.model.js';
import ProductGroup from '../../Models/productgroup.model.js';
import ProductGroupRel from '../../Models/productgroup_rel.model.js';
import ProductImage from '../../Models/productimage.model.js';
import Order from '../../Models/order.model.js';
import OrderLine from '../../Models/orderline.model.js';
import OrderStatus from '../../Models/orderstatus.model.js';
import Cart from '../../Models/cart.model.js';
import Review from '../../Models/review.model.js';

/**
 * Controller for Seed Actions
 */
class SeedController {
	constructor() {
		console.log('TrashGuide Seed Controller: Running seeds');
	} 

	seed_from_csv = async () => {

		const transaction = await sequelize.transaction();
	
		try {

			let data;
			let handle;

			// Orgs
			data = await this.get_csv_data('orgs.csv')
			handle = await Orgs.bulkCreate(data, { transaction });

			// Groups
			data = await this.get_csv_data('groups.csv')
			handle = await Groups.bulkCreate(data, { transaction });

			// User
			data = await this.get_csv_data('users.csv')
			handle = await Users.bulkCreate(data, { transaction });

			// User Groups Relations
			data = await this.get_csv_data('usergrouprel.csv')
			handle = await UserGroupRel.bulkCreate(data, { transaction });

			//////////////////// 

			// Brands
			data = await this.get_csv_data('brands.csv')
			handle = await Brand.bulkCreate(data, { transaction });

			// Products
			data = await this.get_csv_data('products.csv')
			handle = await Product.bulkCreate(data, { transaction });

			// ProductGroups
			data = await this.get_csv_data('productgroups.csv')
			handle = await ProductGroup.bulkCreate(data, { transaction });

			// ProductGroupRel
			data = await this.get_csv_data('productgrouprel.csv')
			handle = await ProductGroupRel.bulkCreate(data, { transaction });

			// Cart
			data = await this.get_csv_data('carts.csv')
			handle = await Cart.bulkCreate(data, { transaction });

			// Order
			data = await this.get_csv_data('orders.csv')
			handle = await Order.bulkCreate(data, { transaction });

			// OrderLine
			data = await this.get_csv_data('orderlines.csv')
			handle = await OrderLine.bulkCreate(data, { transaction });

			// OrderStatus
			data = await this.get_csv_data('orderstatus.csv')
			handle = await OrderStatus.bulkCreate(data, { transaction });

			// Reviews
			data = await this.get_csv_data('reviews.csv')
			handle = await Review.bulkCreate(data, { transaction });

			// Product Image
			data = await this.get_csv_data('productimages.csv')
			handle = await ProductImage.bulkCreate(data, { transaction });
			// Confirm transaction

			await transaction.commit();
		
			console.log('Seeding completed');
		} catch (error) {
			// Hvis der opstår en fejl, rul tilbage transaktionen
			await transaction.rollback();
			console.error('Seeding error:', error);
		}		
	}

	get_csv_data = async file => {
		const csvpath = path.resolve(`./Data/${file}`);
		const data = []

		return new Promise((resolve, reject) => {
			fs.createReadStream(csvpath)
			.pipe(csv())
			.on('data', row => {
				data.push(row)
			})
			.on('end', async () => {
				resolve(data);
			})
			.on('error', error => {
				reject(error)
			})
		}) 

	}
}

export default SeedController