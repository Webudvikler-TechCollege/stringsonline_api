import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'

class Brand extends Model{}

Brand.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	image: {
		type: DataTypes.STRING,
		allowNull: false
	},
}, {
	sequelize,
	modelName: 'brand',
	underscored: true,
})

export default Brand