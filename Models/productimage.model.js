import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import Product from './product.model.js'

// Skriver ny klasse og udvider den med SQ's Model klasse
class ProductImage extends Model {}

// Initialiserer model
export default ProductImage.init({
	// Definerer felt egenskaber
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	product_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Product,
			key: 'id'
		}
	},
	image: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	sequelize, // Sequelize objekt
	modelName: 'productimage', // Model (tabel) navn
	underscored: true, // Brug underscore istedet for camelcase
	//freezeTableName: false, // Lås tabelnavne til ental
	timestamps: false
})