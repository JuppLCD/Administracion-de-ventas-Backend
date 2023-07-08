import { DataTypes } from 'sequelize';

import type { Sequelize } from 'sequelize';
import type { ICategoryModel } from '../types/category.interface';

export default function categorySchema(sequelize: Sequelize) {
	return sequelize.define<ICategoryModel>(
		'Category',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},

			name: {
				type: DataTypes.STRING,
				unique: true,
			},
			description: {
				type: DataTypes.STRING,
			},
		},
		{
			// Other model options go here
			timestamps: false,
		}
	);
}
