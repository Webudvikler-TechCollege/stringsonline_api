import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'

// Skriver ny klasse og udvider den med SQ's Model klasse
class OrderStatus extends Model {}

// Initialiserer model
export default OrderStatus.init({
	// Definerer felt egenskaber
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	sequelize, // Sequelize objekt
	modelName: 'orderstatus', // Model (tabel) navn
	underscored: true, // Brug underscore istedet for camelcase
	freezeTableName: true, // Lås tabelnavne til ental
	timestamps: false
})