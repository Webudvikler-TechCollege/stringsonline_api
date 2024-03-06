import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import Product from './product.model.js'
import ProductGroup from './productgroup.model.js'

// Skriver ny klasse og udvider den med SQ's Model klasse
class ProductGroupRel extends Model {}

// Initialiserer model
export default ProductGroupRel.init({
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
	productgroup_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: ProductGroup,
			key: 'id'
		}
	}
}, {
	sequelize, // Sequelize objekt
	modelName: 'product_group_rel', // Model (tabel) navn
	freezeTableName: true,
	underscored: true, // Brug underscore istedet for camelcase
	timestamps: false
})