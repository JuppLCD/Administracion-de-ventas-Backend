import { DataTypes } from 'sequelize';

import type { Sequelize } from 'sequelize';
import type { IProductModel } from '../types/product.interface';

export default function productSchema(sequelize: Sequelize) {
	return sequelize.define<IProductModel>(
		'Product',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			category_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			name: {
				type: DataTypes.STRING,
				unique: true,
			},
			description: {
				type: DataTypes.STRING,
			},
			code: {
				type: DataTypes.STRING,
				unique: true,
			},
			img: {
				type: DataTypes.STRING,
			},

			price: {
				type: DataTypes.DECIMAL,
			},
			stock: {
				type: DataTypes.INTEGER,
			},
		},
		{
			// Other model options go here
			timestamps: false,
		}
	);
}
