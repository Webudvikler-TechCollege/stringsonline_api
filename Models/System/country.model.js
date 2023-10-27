import sequelize from '../../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'

class Country extends Model {}

Country.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	code: {
		type: DataTypes.STRING,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	latitude: {
		type: DataTypes.DOUBLE,
		allowNull: false
	},
	longtitude: {
		type: DataTypes.DOUBLE,
		allowNull: false
	}
},{
	sequelize,
	modelName: 'country',
	underscored: true
})

export default Country