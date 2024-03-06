import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import Brand from './brand.model.js'

// Skriver ny klasse og udvider den med SQ's Model klasse
class Product extends Model {}

// Initialiserer model
export default Product.init({
	// Definerer felt egenskaber
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	item_number: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	slug: {
		type: DataTypes.STRING,
		allowNull: true
	},	
	description_short: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description_long: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	image: {
		type: DataTypes.STRING,
		allowNull: false
	},
	price: {
		type: DataTypes.DOUBLE,
		allowNull: false
	},
	offerprice: {
		type: DataTypes.DOUBLE,
		allowNull: false
	},
	stock: {
		type: DataTypes.DOUBLE,
		allowNull: false
	},
	brand_id: {
		type: DataTypes.DOUBLE,
		allowNull: false,
		references: {
			model: Brand,
			key: 'id'
		}
	},
	is_active: {
		type: DataTypes.BOOLEAN,
		allowNull: false
},
}, {
	sequelize, // Sequelize objekt
	modelName: 'product', // Model (tabel) navn
	underscored: true, // Brug underscore istedet for camelcase
})