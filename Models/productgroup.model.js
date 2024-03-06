import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'

// Skriver ny klasse og udvider den med SQ's Model klasse
class ProductGroup extends Model {}

// Initialiserer model
export default ProductGroup.init({
	// Definerer felt egenskaber
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	parent_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	slug: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	sort_number: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	is_active: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	},
	is_deleted: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	}
}, {
	sequelize, // Sequelize objekt
	modelName: 'productgroup', // Model (tabel) navn
	underscored: true, // Brug underscore istedet for camelcase
})