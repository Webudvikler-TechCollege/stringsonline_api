import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import User from './System/user.model.js'
import Product from './product.model.js'

class CartLine extends Model{}

export default CartLine.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: User,
			key: 'id'
		}
	},
	product_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Product,
			key: 'id'
		}
	},
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, {
	sequelize,
	modelName: 'cartline',
	underscored: true,
})