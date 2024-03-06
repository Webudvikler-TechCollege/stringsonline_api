import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import User from './System/user.model.js'
import Country from './System/country.model.js'

// Skriver ny klasse og udvider den med SQ's Model klasse
class Order extends Model {}

// Initialiserer model
Order.init({
	// Definerer felt egenskaber
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
	delivery_address: {
		type: DataTypes.STRING,
		allowNull: false
	},
	delivery_zipcode: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	delivery_city: {
		type: DataTypes.STRING,
		allowNull: false
	},
	delivery_country_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Country,
			key: 'id'
		}
	},
	status: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	}
}, {
	sequelize, // Sequelize objekt
	modelName: 'order', // Model (tabel) navn
	underscored: true, // Brug underscore istedet for camelcase
	//freezeTableName: false, // Lås tabelnavne til ental
	//createdAt: true, // Undlad createdAt felt
	//updatedAt: true //Undlad updatedAt felt
})

export default Order