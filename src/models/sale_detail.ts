import { DataTypes } from 'sequelize';

import type { Sequelize } from 'sequelize';
import type { ISaleDetailModel } from '../types/models/sale_detail.interface';

export default function saleDetailSchema(sequelize: Sequelize) {
	return sequelize.define<ISaleDetailModel>(
		'Sale_Detail',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			sale_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			product_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			stock: {
				type: DataTypes.INTEGER,
			},
			price: {
				type: DataTypes.DECIMAL(10, 3),
			},
		},
		{
			// Other model options go here
			timestamps: false,
		}
	);
}
