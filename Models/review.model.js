import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import Product from './product.model.js'
import User from './System/user.model.js'

// Skriver ny klasse og udvider den med SQ's Model klasse
class Review extends Model {}

// Initialiserer model
Review.init({
	// Definerer felt egenskaber
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	subject: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'Ikke navngivet'
	},
	comment: {
		type: DataTypes.TEXT,
		allowNull: true
	},
	num_stars: {
		type: DataTypes.INTEGER,
		allowNull: true
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
	},	
	product_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Product,
			key: 'id'
		}
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: User,
			key: 'id'
		}
	},
	is_active: {
		type: DataTypes.BOOLEAN,
		allowNull: true
	}
}, {
	sequelize, // Sequelize objekt
	modelName: 'review', // Model (tabel) navn
	underscored: true, // Brug underscore istedet for camelcase
	//freezeTableName: false, // Lås tabelnavne til ental
	//createdAt: true, // Undlad createdAt felt
	//updatedAt: true //Undlad updatedAt felt
})

export default Review