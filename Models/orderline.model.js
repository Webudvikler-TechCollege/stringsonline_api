import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import Order from './order.model.js'
import Product from './product.model.js'

// Skriver ny klasse og udvider den med SQ's Model klasse
class OrderLine extends Model {}

// Initialiserer model
OrderLine.init({
	// Definerer felt egenskaber
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	order_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Order,
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
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	price: {
		type: DataTypes.DOUBLE,
		allowNull: false
	}
}, {
	sequelize, // Sequelize objekt
	modelName: 'orderline', // Model (tabel) navn
	underscored: true, // Brug underscore istedet for camelcase
	//freezeTableName: false, // Lås tabelnavne til ental
	timestamps: false
})

export default OrderLine