import sequelize from '../../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import Country from './country.model.js'

class Org extends Model {}

Org.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	address: {
		type: DataTypes.STRING,
		allowNull: false
	},
	zipcode: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	city: {
		type: DataTypes.STRING,
		allowNull: false
	},
    country_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
		  model: Country,
		  key: 'id'
		}
	},	
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	phone: {
		type: DataTypes.STRING,
		allowNull: false
	},
	longtitude: {
		type: DataTypes.DOUBLE,
		allowNull: true
	},
	latitude: {
		type: DataTypes.DOUBLE,
		allowNull: true
	}
},{
	sequelize,
	modelName: 'org',
	underscored: true
})

export default Org